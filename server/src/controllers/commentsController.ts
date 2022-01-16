import { Router } from "express";
import { getCommentById } from "../services/commentService";
const router = Router();

router.get('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    console.log(commentId);
    try {
        const comment = await getCommentById(commentId);
        const text = comment.text;
        res.status(200).json({ text });

    } catch (err) {
        console.log(err);
        res.status(404).json({ "message": err.message });
    }
})



export { router };