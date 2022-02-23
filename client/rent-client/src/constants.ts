import { userRole, userRoleNarrow } from "./models/enums/Role";
import { IUser } from "./models/IUser";
import { getCookieJWTInfo } from "./services/userService";

export const PORT = '3030';
//ipconfig
export const host = 'localhost';

export const baseAddress = `http://${host}:${PORT}`
export const loginAddress: string = `${baseAddress}/auth/login`;
export const registerAddress: string = `${baseAddress}/auth/register`;
export const resourcesAddress: string = `${baseAddress}/api/resources`
export const staticAddress: string = `${baseAddress}/static`;
export const usersAddress: string = `${baseAddress}/users`;
export const commentsAddress: string = `${baseAddress}/api/comments`;

export const initialValues: IUser = {
    firstName: '',
    lastName: '',
    email: 'foobar@example.com',
    password: 'foobar',
    role: userRoleNarrow.Guest
}


export const emptyUser: IUser = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: userRoleNarrow.Guest
}

export const getInfo = (defaultValue: IUser) => {
    const newUser = getCookieJWTInfo() != null ? getCookieJWTInfo()! : defaultValue;
    return newUser;
}
