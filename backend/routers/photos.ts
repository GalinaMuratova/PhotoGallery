import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import Photo from "../models/Photo";
import mongoose from "mongoose";

const photosRouter = express.Router();

photosRouter.get('/', async (req, res) => {
   try {
       if (req.query.userId) {
           const photos = await Photo.find({user: req.query.userId}).populate('user', 'displayName role');
           return res.send(photos);
       } else {
           const photos = await Photo.find().populate('user','displayName role');
           return res.send(photos);
       }
   } catch {
       return res.sendStatus(500);
   }
})

photosRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const photo = new Photo ({
            user: user._id,
            title: req.body.title,
            image: req.file?.filename
        });
        await photo.save();
        res.send(photo);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

photosRouter.delete('/:id', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const photo = await Photo.findOne({_id: req.params.id});

        if (!photo) {
            return res.sendStatus(403);
        }

        if (user.role !== 'admin' && String(user._id) !== String(photo.user)) {
            return res.status(403).send({ error: 'You are not authorized to delete this photo' });
        }

        await Photo.deleteOne({ _id: req.params.id });
        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
});

export default photosRouter;