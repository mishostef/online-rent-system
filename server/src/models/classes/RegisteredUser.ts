import { IUser } from '../interfaces/IUser'
import { userRole } from '../enums'


export class RegisteredUser implements IUser {
    constructor(public email: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public role: userRole) { }
}

export class Admin extends RegisteredUser {
    constructor() {
        super('sysadmin@abv.bg', '@bracadAb#$7!', 'Sysadmin', 'AdminSys', userRole.Admin)
    }
}

export class Owner extends RegisteredUser {
    constructor(email, password, firstName, lastName) {
        super(email, password, firstName, lastName, userRole.Owner)
    }
}

export class Guest extends RegisteredUser {
    constructor(email, password, firstName, lastName) {
        super(email, password, firstName, lastName, userRole.Guest)
    }
}