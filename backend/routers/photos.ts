import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import Photo from "../models/Photo";

const photosRouter = express.Router();

photosRouter.get('/', async (req, res) => {
   try {
       if (req.query.userId) {
           const photos = await Photo.find({user: req.query.userId}).populate('user', 'displayName');
           return res.send(photos);
       } else {
           const photos = await Photo.find().populate('user','displayName');
           return res.send(photos);
       }
   } catch {
       return res.sendStatus(500);
   }
});


photosRouter.get('/:id', async (req, res) => {
   try {
       const photo = await Photo.findById(req.params.id);
       if (!photo) {
           return res.sendStatus(404);
       }
       return res.send(photo);
   } catch {
       return res.sendStatus(500);
   }
});

photosRouter.post('/', auth, imagesUpload.single('image'), async (req, res) => {
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
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

photosRouter.delete('/:id', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const photo = await Photo.findOne({_id: req.params.id});

        if (!photo) {
            return res.sendStatus(403);
        }
        console.log(photo.user)
        console.log(user._id)

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