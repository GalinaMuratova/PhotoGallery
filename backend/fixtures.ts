import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Photo from "./models/Photo";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('photos');
    } catch (e) {
        console.log('Collection were not present');
    }
    const [user1, user2] = await User.create(
        {
            email: 'anna@gmail.com',
            displayName: 'Anna Gavalda',
            password: '123',
            token: crypto.randomUUID(),
            role: 'admin',
            avatar: 'anna.jpeg'
        },
        {
            email: 'sam@gmail.com',
            displayName: 'Sam Smith',
            password: '456',
            token: crypto.randomUUID(),
            role: 'user',
            avatar: 'sam.jpg'
        },
    );

    await Photo.create({
        user: user1._id,
        title: 'Some kind of column',
        image: 'column.jpg'

    }, {
        user: user1._id,
        title: 'Saint Sophie Cathedral',
        image: 'сathedral.jpg'

    }, {
        user: user1._id,
        title: 'Night Istanbul',
        image: 'istanbul.jpg'

    }, {
        user: user2._id,
        title: 'Nursing home in America',
        image: 'nursinghome.jpg'

    }, {
        user: user2._id,
        title: 'Random T-shirt in frame',
        image: 'tshirt.jpg'

    }, {
        user: user2._id,
        title: 'Sunset at Issyk Kul',
        image: 'Sunset.jpg'

    })
    await db.close();
};
run().catch(console.error);