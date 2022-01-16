import { Comment } from '../models/Comment';
import { Resource } from '../models/Resource';

async function getCommentById(commentId: string) {
    const comment = await Comment.findById(commentId);
    console.log(comment.text)
    return comment;
}

async function editComment(commentId, newText) {
    const comment = await Comment.findById(commentId);
    comment.text = newText;
    comment.save();
}

async function addComment(resourceId: string, text: string) {
    const resource = await Resource.findById(resourceId);
    const comment = new Comment(text);
    const cmt = await comment.save();
    const commentId = cmt._id;
    resource.comments.push(commentId);
    await resource.save();
}
export {
    addComment,
    getCommentById,
    editComment
}