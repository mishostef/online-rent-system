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
const bcrypt = require('bcrypt');
const jsonwebtoken_1 = require("jsonwebtoken");
const userService = require('../services/user.js');
const constants_1 = require("../../dist/config/constants");
module.exports = () => {
    return (req, res, next) => {
        if (parseToken(req, res)) {
            req.auth = {
                register(email, firstname, password) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const token = yield register(username, password);
                        res.cookie(constants_1.constants.COOKIE_NAME, token);
                    });
                },
                login(username, password) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const token = yield login(username, password);
                        res.cookie(constants_1.constants.COOKIE_NAME, token);
                    });
                },
                logout() {
                    res.clearCookie(constants_1.constants.COOKIE_NAME);
                }
            };
        }
        next();
    };
};
function register(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield userService.getUserByUserName(username);
        if (existing)
            throw new Error(`username is already used`);
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = yield userService.createUser(username, hashedPassword);
        return generateToken(user);
    });
}
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userService.getUserByUserName(username);
        if (!user)
            throw new Error('no such user!');
        const hasMatch = yield bcrypt.compare(password, user.hashedPassword);
        if (!hasMatch)
            throw new Error(`Incorrect password!`);
        return generateToken(user);
    });
}
function generateToken(user) {
    const token = jsonwebtoken_1.default.sign({
        _id: user._id,
        username: user.username
    }, TOKEN_SECRET);
    return token;
}
function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
            return true;
        }
        catch (err) {
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=auth.js.map