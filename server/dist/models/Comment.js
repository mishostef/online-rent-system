"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    text: { type: String, required: true },
    authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: [] },
});
exports.Comment = mongoose_1.model('Comment', schema);
//# sourceMappingURL=Comment.js.map