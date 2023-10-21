import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';
import crypto from "crypto";
import {OAuth2Client} from "google-auth-library";
import config from "../config";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file!.filename,
        });
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({error: 'Google login error'});
        }

        const email = payload['email'];
        const id = payload['sub'];
        const displayName = payload['name'];
        const avatar = payload['picture']

        if (!email) {
            return res.status(400).send({error: 'Not enough user data to continue'});
        }

        let user = await User.findOne({googleID: id});

        if (!user || !displayName) {
            user = new User({
                email: email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName,
                avatar
            });
        }

        user.generateToken();
        await user.save();
        return res.send({message: 'Login with Google successful!', user});
    } catch (e) {
        return next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(400).send({error: 'Wrong username '});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({error: 'Wrong username or password'});
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'Email and password correct', user});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const success = {message: 'Success'};

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();
        await user.save();

        return res.send(success);
    } catch (e) {
        next(e);
    }
});

export default usersRouter;
