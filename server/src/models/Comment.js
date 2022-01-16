"use strict";
exports.__esModule = true;
exports.Comment = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    text: { type: String, required: true },
    authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', "default": [] }
});
exports.Comment = mongoose_1.model('Comment', schema);
