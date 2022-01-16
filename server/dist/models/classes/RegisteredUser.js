"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guest = exports.Owner = exports.Admin = exports.RegisteredUser = void 0;
const enums_1 = require("../enums");
class RegisteredUser {
    constructor(email, password, firstName, lastName, role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
}
exports.RegisteredUser = RegisteredUser;
class Admin extends RegisteredUser {
    constructor() {
        super('sysadmin@abv.bg', '@bracadAb#$7!', 'Sysadmin', 'AdminSys', enums_1.userRole.Admin);
    }
}
exports.Admin = Admin;
class Owner extends RegisteredUser {
    constructor(email, password, firstName, lastName) {
        super(email, password, firstName, lastName, enums_1.userRole.Owner);
    }
}
exports.Owner = Owner;
class Guest extends RegisteredUser {
    constructor(email, password, firstName, lastName) {
        super(email, password, firstName, lastName, enums_1.userRole.Guest);
    }
}
exports.Guest = Guest;
//# sourceMappingURL=RegisteredUser.js.map