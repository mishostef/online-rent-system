import { Schema, model } from 'mongoose';

const schema = new Schema({
    address: { type: String, required: true, message: 'address validation' },
    description: { type: String, required: true, message: 'description validation' },
    imageName: { type: String, required: true },
    resourceType: {
        type: String, required: true,
        values: ['villa',
            'house'],
        message: '{VALUE} is not supported'

    },
    shortDescription: { type: String, required: true, message: 'short description validation' },
    isMD: {
        type: Boolean,
        default: false
    },
    date: { type: Date, default: Date.now },

    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    guests: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    likes: { type: Number, default: 0 }
});

export const Resource = model('Resource', schema)