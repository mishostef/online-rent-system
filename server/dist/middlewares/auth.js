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
exports.auth = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require('../services/userService');
const constants_1 = require("../config/constants");
exports.auth = () => {
    return (req, res, next) => {
        try {
            if (parseToken(req, res)) {
                req.auth = {
                    register(email, password, firstName, lastName, role) {
                        return __awaiter(this, void 0, void 0, function* () {
                            return register(email, password, firstName, lastName, role);
                            // addCookieAuth(res, token);
                        });
                    },
                    login(email, password) {
                        return __awaiter(this, void 0, void 0, function* () {
                            return login(email, password);
                            //  addCookieAuth(res, token);
                        });
                    },
                    logout() {
                        removeAuth(res);
                    }
                };
            }
        }
        catch (err) {
            next(err);
        }
        next();
    };
};
function addAuth(res, token) {
    addCookieAuth(res, token);
}
function removeAuth(res) {
    removeCookieAuth(res);
}
function getToken(req) {
    return getHeaderToken(req);
}
///cookieAuth-another file
function addCookieAuth(res, token) {
    res.cookie(constants_1.constants.COOKIE_NAME, token);
}
function removeCookieAuth(res) {
    res.clearCookie(constants_1.constants.COOKIE_NAME);
}
function getCookieToken(req) {
    const token = req.cookies[constants_1.constants.COOKIE_NAME];
    return token;
}
////
function getHeaderToken(req) {
    const token = req.headers['authorization'];
    return token;
}
function register(email, password, firstName, lastName, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield userService.getUserByUserName(email);
        if (existing)
            throw new Error(`username is already used`);
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = yield userService.createUser(email, hashedPassword, firstName, lastName, role);
        return generateToken(user);
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userService.getUserByUserName(email);
        if (!user)
            throw new Error('no such user!');
        const hasMatch = yield bcrypt.compare(password, user.hashedPassword);
        if (!hasMatch)
            throw new Error(`Incorrect password!`);
        return generateToken(user);
    });
}
function generateToken(user) {
    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    }, constants_1.constants.TOKEN_SECRET);
    return token;
}
function parseToken(req, res) {
    const token = getToken(req);
    if (token) {
        try {
            const userData = jwt.verify(token, constants_1.constants.TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
            return true;
        }
        catch (err) {
            removeAuth(res);
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=auth.js.map