
import { commentsAddress, resourcesAddress, usersAddress } from "../constants";
import jwt_decode from 'jwt-decode';
import { IUser } from "../models/IUser";
import axios from "axios";
import { ITokenInfo } from "../models/ITokenInfo";
import { IResource } from "../models/IResource";




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
async function getResourceById(resourceId: string | undefined) {
    const res = (await axios.get(`${resourcesAddress}/${resourceId}`)).data as IResource;
    /* .then(data => {
         console.log(data.data);
         const ires = (data.data as IResource);
         console.log(ires);
         return ires;
     })*/
     return res;

}


async function bookResource(resourceId: string) {
    const user = getCookieJWTInfo();
    return axios.post(`${resourcesAddress}/${resourceId}`, { userId: user?._id }, options());
}

async function getResources() {
    return axios(`${resourcesAddress}`);
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

async function editUsers(edited: ITokenInfo[]) {
    return axios.put(`${usersAddress}`, { edited }, options())
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
    editComment,
    editUsers,
    getResources,
    getResourceById
}

