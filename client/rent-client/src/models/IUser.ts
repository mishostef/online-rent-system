import { userRole } from "./enums/Role";

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    firstName:string;
    lastName:string;
    role:userRole
}

