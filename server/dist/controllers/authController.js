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
exports.router = void 0;
const express_1 = require("express");
const guards_1 = require("../middlewares/guards");
const constants_1 = require("../config/constants");
const router = express_1.Router();
exports.router = router;
router.post('/register', guards_1.isGuest(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password, firstName, lastName, role } = req.body;
    try {
        const regex = /\S+@\S+\.\S+/gm;
        const isValidEmail = (regex.test(req.body.email));
        const isLongEnough = (req.body.email.length > 3);
        if (!isValidEmail)
            throw new Error(`Invalid Email`);
        if (req.body.password.trim() < 3)
            throw new Error(`Password is too short`);
        if (firstName < 2)
            throw new Error(`firstname is too short`);
        if (lastName < 2)
            throw new Error(`lastname is too short`);
        const token = yield req['auth'].register(email, password, firstName, lastName, role);
        res.status(201).json({ [constants_1.constants.COOKIE_NAME]: token });
        return;
        //res.status(201).json({ message: "success" });
    }
    catch (err) {
        next(JSON.stringify({ status: err.status || 404, message: err.message }));
    }
}));
router.post('/login', guards_1.isGuest(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const token = yield req['auth'].login(req.body.email, req.body.password);
        res.status(200).json({ [constants_1.constants.COOKIE_NAME]: token });
    }
    catch (err) {
        console.log(err);
        next(JSON.stringify({ status: err.status || 404, message: err.message }));
    }
}));
router.get('/logout', (req, res) => {
    req['auth'].logout();
    res.redirect('/');
});
//# sourceMappingURL=authController.js.map