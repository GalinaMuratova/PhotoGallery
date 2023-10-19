import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collection were not present');
    }
    await User.create(
        {
            email: 'anna@gmail.com',
            displayName: 'Anna Gavalda',
            password: '123',
            token: crypto.randomUUID(),
            role: 'admin',
            avatar:'anna.jpeg'
        },
        {
            email: 'sam@gmail.com',
            displayName: 'Sam Smith',
            password: '456',
            token: crypto.randomUUID(),
            role: 'user',
            avatar:'sam.jpg'
        },
    );
    await db.close();
};
run().catch(console.error);