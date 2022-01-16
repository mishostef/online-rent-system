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
exports.router = void 0;
const express_1 = require("express");
const commentService_1 = require("../services/commentService");
const router = express_1.Router();
exports.router = router;
router.get('/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    console.log(commentId);
    try {
        const comment = yield commentService_1.getCommentById(commentId);
        const text = comment.text;
        res.status(200).json({ text });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ "message": err.message });
    }
}));
//# sourceMappingURL=commentsController.js.map