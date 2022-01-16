"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isGuest = exports.isUser = void 0;
function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        }
        else {
            next({ status: 403, message: `You are not logged in.` });
        }
    };
}
exports.isUser = isUser;
function isAdmin() {
    return (req, res, next) => {
        if (req.user.role == 2) {
            next();
        }
        else {
            next({ status: 403, message: `You are not admin.` });
        }
    };
}
exports.isAdmin = isAdmin;
function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        }
        else {
            next({ status: 403, message: `You are already logged in.` });
        }
    };
}
exports.isGuest = isGuest;
//# sourceMappingURL=guards.js.map