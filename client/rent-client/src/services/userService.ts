
import { usersAddress } from "../constants";
import jwt_decode from 'jwt-decode';
import { IUser } from "../models/IUser";
import axios from "axios";
import { ITokenInfo } from "../models/ITokenInfo";


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
    getAllUsers,
    deleteMany,
    editUsers
}

