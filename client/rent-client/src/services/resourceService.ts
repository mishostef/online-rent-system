import axios from "axios";
import { resourcesAddress } from "../constants";
import { IResource } from "../models/IResource";
import { IUser } from "../models/IUser";
import { options } from "./userService";


async function bookResource(resourceId: string, user: IUser) {
    return axios.post(`${resourcesAddress}/${resourceId}`, { userId: user?._id }, options());
}

async function getResourceById(resourceId: string | undefined) {
    const res = (await axios.get(`${resourcesAddress}/${resourceId}`)).data as IResource;
    return res;
}

async function likeResource(resourceId: string, user: IUser) {
    return axios.post(`${resourcesAddress}/${resourceId}/likes`, { userId: user?._id, likes: 1 }, options());
}

async function deleteResource(resourceId: string) {
    return axios.delete(`${resourcesAddress}/${resourceId}`);
}

async function getResources() {
    return axios(`${resourcesAddress}`);
}

export {
    bookResource,
    deleteResource,
    getResources,
    getResourceById,
    likeResource
}