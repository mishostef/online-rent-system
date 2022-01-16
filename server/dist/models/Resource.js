"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    guests: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: [] }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    likes: { type: Number, default: 0 }
});
exports.Resource = mongoose_1.model('Resource', schema);
//# sourceMappingURL=Resource.js.map