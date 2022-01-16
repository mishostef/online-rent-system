import { Schema, model } from 'mongoose';

const schema = new Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String, required: true,
        values: ['Owner',
            'Guest',
            'Admin'],
        message: '{VALUE} is not supported'
    }
});

export const User = model('User', schema)