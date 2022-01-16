import {userRole} from '../enums'

export interface IUser {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: userRole
}