import { Schema, model } from 'mongoose';

const schema = new Schema({
    text: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', default: [] },
});

export const Comment = model('Comment', schema)