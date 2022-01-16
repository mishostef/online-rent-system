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
exports.getUserByUserName = exports.createUser = void 0;
const User = require('../models/User');
function createUser(username, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new User({
            username,
            hashedPassword
        });
        yield user.save();
        return user;
    });
}
exports.createUser = createUser;
function getUserByUserName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const pattern = new RegExp(`^${username}$`, 'i');
        const user = yield User.findOne({ username: { $regex: pattern } });
        return user;
    });
}
exports.getUserByUserName = getUserByUserName;
//# sourceMappingURL=userService.js.map