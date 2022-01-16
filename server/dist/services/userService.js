"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteManyById = exports.deleteUserById = exports.getAllUsers = exports.bookResource = exports.addAdmins = exports.updateUser = exports.getUserById = exports.getUserByUserName = exports.createUser = void 0;
const User_1 = require("../models/User");
const enums_1 = require("../models/enums");
const bcrypt = require("bcrypt");
const Resource_1 = require("../models/Resource");
const mongoose = require("mongoose");
function createUser(email, hashedPassword, firstName, lastName, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new User_1.User({
            email,
            hashedPassword,
            firstName,
            lastName,
            role
        });
        yield user.save();
        return user;
    });
}
exports.createUser = createUser;
function addAdmins(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt.hash(password, 10);
        try {
            const admin = yield User_1.User.findOne({ email: 'sysadmin@abv.bg' });
            let exists = false;
            if (admin != null) {
                exists = yield bcrypt.compare(password, admin.hashedPassword);
            }
            if (!exists)
                yield createUser(username, hashedPassword, 'Sysadmin', 'AdminSys', enums_1.userRole.Admin);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.addAdmins = addAdmins;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return User_1.User.findById(id);
    });
}
exports.getUserById = getUserById;
function getUserByUserName(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const pattern = new RegExp(`^${email}$`, 'i');
        const user = yield User_1.User.findOne({ email: { $regex: pattern } });
        return user;
    });
}
exports.getUserByUserName = getUserByUserName;
function updateUser(userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt.hash(body.password, 10);
        body.hashedPassword = hashedPassword;
        delete body.password;
        User_1.User.findByIdAndUpdate({ _id: userId }, body, (err, result) => {
            if (err)
                console.log(err);
        });
    });
}
exports.updateUser = updateUser;
function bookResource(resourceId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = yield Resource_1.Resource.findById(resourceId);
        const ownerId = resource.ownerId.toString();
        if (userId === ownerId) {
            throw new Error(`Owner cannot be a guest!`);
        }
        if (resource.guests.map(x => x.toString()).includes(userId)) {
            throw new Error("You are already a guests!");
        }
        resource.guests.push(userId);
        resource.save();
    });
}
exports.bookResource = bookResource;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.User.find({});
        const usersReturned = users.map(user => {
            return {
                _id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            };
        });
        return usersReturned;
    });
}
exports.getAllUsers = getAllUsers;
function deleteUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleted = yield User_1.User.findOneAndRemove({ _id: id });
        return deleted;
    });
}
exports.deleteUserById = deleteUserById;
function deleteManyById(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const objIds = ids.map(i => mongoose.Types.ObjectId(i));
        const deletedCount = yield User_1.User.remove({ _id: { $in: objIds } });
        return deletedCount;
    });
}
exports.deleteManyById = deleteManyById;
//# sourceMappingURL=userService.js.map