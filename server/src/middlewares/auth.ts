import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
const userService = require('../services/userService');
import { constants } from '../config/constants';
import { userRole } from '../models/enums'

export const auth = () => {
    return (req, res, next) => {
        try {
            if (parseToken(req, res)) {
                req.auth = {
                    async register(email: string, password: string, firstName: string, lastName: string, role: userRole) {
                        return register(email, password, firstName, lastName, role);                        
                        // addCookieAuth(res, token);
                    },
                    async login(email, password) {
                        return login(email, password);
                        //  addCookieAuth(res, token);
                    },
                    logout() {
                        removeAuth(res);
                    }
                };
            }
        } catch (err) {
            next(err)
        }
        next();
    }

}

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
    res.cookie(constants.COOKIE_NAME, token);
}

function removeCookieAuth(res) {
    res.clearCookie(constants.COOKIE_NAME);
}

function getCookieToken(req) {
    const token = req.cookies[constants.COOKIE_NAME];
    return token;
}
////
function getHeaderToken(req) {
    const token = req.headers['authorization'];
    return token;
}
async function register(email: string, password: string, firstName: string, lastName: string, role: userRole) {
    const existing = await userService.getUserByUserName(email);
    if (existing) throw new Error(`username is already used`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(email, hashedPassword, firstName, lastName, role);
    return generateToken(user);
}

async function login(email: string, password: string) {
    const user = await userService.getUserByUserName(email);
    if (!user) throw new Error('no such user!');
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch) throw new Error(`Incorrect password!`);
    return generateToken(user);
}

function generateToken(user) {
    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    }, constants.TOKEN_SECRET);
    return token;
}

function parseToken(req, res) {
    const token = getToken(req);
    if (token) {
        try {
            const userData = jwt.verify(token, constants.TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
            return true;
        } catch (err) {
            removeAuth(res);

            return false;
        }
    }
    return true;
}