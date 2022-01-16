function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            next({ status: 403, message: `You are not logged in.` });
        }
    };
}

function isAdmin() {
    return (req, res, next) => {
        if (req.user.role == 2) {
            next();
        } else {
            next({ status: 403, message: `You are not admin.` });
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            next({ status: 403, message: `You are already logged in.` });
        }
    };
}
export {
    isUser,
    isGuest,
    isAdmin
};