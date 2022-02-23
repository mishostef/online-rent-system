import { userRole, userRoleNarrow } from "./enums/Role";

export interface IUser {
    _id?: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    role: userRoleNarrow | userRole
}

