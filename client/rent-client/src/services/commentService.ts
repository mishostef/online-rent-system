
///CommentService

import axios from "axios";
import { commentsAddress, resourcesAddress } from "../constants";
import { options } from "./userService";

async function getCommentById(commentId: string) {
    return axios.get(`${commentsAddress}/${commentId}`);
}

async function getAllCommentsByResourceId(resourceId: string) {
    return axios.get(`${resourcesAddress}/${resourceId}/comments`)
}
///
async function addComment(url: string, text: string,) {
    return axios.post(url, { text }, options());

}

async function editComment(url: string, text: string) {
    return axios.put(url, { text }, options());
}

export {
    addComment,
    editComment,
    getCommentById,
    getAllCommentsByResourceId
}