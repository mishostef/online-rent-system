
import { commentsAddress, resourcesAddress, usersAddress } from "../constants";
import jwt_decode from 'jwt-decode';
import { IUser } from "../models/IUser";
import axios from "axios";




//if (token) axios.defaults.headers.common['authorization'] = token;
export const options = function () {
    const token = (sessionStorage.getItem('SESSION_TOKEN'));
    return token ? { headers: { 'authorization': token } } : { "Content-Type": "application/json" }
}
function getCookieJWTInfo(): IUser | null {
    const cookie = sessionStorage.getItem('SESSION_TOKEN');
    const user = cookie ? jwt_decode(cookie) as IUser : null;
    return user;
}

///ResourceService
async function bookResource(resourceId: string) {
    const user = getCookieJWTInfo();
    return axios.post(`${resourcesAddress}/${resourceId}`, { userId: user?._id }, options());
}

async function deleteResource(resourceId: string) {
    return axios.delete(`${resourcesAddress}/${resourceId}`);
}

async function likeResource(resourceId: string) {
    const user = getCookieJWTInfo();
    return axios.post(`${resourcesAddress}/${resourceId}/likes`, { userId: user?._id, likes: 1 }, { withCredentials: true });
}

async function addComment(url: string, text: string,) {
    return axios.post(url, { text }, options());

}

async function editComment(url: string, text: string) {
    return axios.put(url, { text }, options());
}
///CommentService

async function getCommentById(commentId: string) {
    return axios.get(`${commentsAddress}/${commentId}`);
}

async function getAllCommentsByResourceId(resourceId: string) {
    return axios.get(`${resourcesAddress}/${resourceId}/comments`)
}
///

async function getAllUsers() {
    return axios.get(`${usersAddress}`, options());
}

async function deleteMany(ids: string[]) {
    return axios.post(`${usersAddress}/delete`, { ids }, options());
}

export {
    getCookieJWTInfo,
    bookResource,
    deleteResource,
    getCommentById,
    likeResource,
    getAllCommentsByResourceId,
    getAllUsers,
    deleteMany,
    addComment,
    editComment
}

