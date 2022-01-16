"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editComment = exports.getCommentById = exports.addComment = void 0;
const Comment_1 = require("../models/Comment");
const Resource_1 = require("../models/Resource");
function getCommentById(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield Comment_1.Comment.findById(commentId);
        console.log(comment.text);
        return comment;
    });
}
exports.getCommentById = getCommentById;
function editComment(commentId, newText) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield Comment_1.Comment.findById(commentId);
        comment.text = newText;
        comment.save();
    });
}
exports.editComment = editComment;
function addComment(resourceId, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = yield Resource_1.Resource.findById(resourceId);
        const comment = new Comment_1.Comment(text);
        const cmt = yield comment.save();
        const commentId = cmt._id;
        resource.comments.push(commentId);
        yield resource.save();
    });
}
exports.addComment = addComment;
//# sourceMappingURL=commentService.js.map