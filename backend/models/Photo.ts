import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'There is no such user',
        },
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;