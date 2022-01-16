import {userRole} from '../enums/Role'
export interface RegisteredUser{
    email:string,
    role: userRole
}