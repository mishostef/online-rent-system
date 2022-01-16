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
const userService_1 = require("../services/userService");
const router = express_1.Router();
exports.router = router;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.getAllUsers();
        console.dir(JSON.stringify(users));
        res.status(201).json(users);
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
}));
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield userService_1.getUserById(userId);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
}));
router.delete('/:userId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const deleted = yield userService_1.deleteUserById(userId);
        res.status(200).json({ 'message': `successfully deleted ${deleted.email}` });
    }
    catch (err) {
        console.log(err);
        next(JSON.stringify({ "message": `in next err handler=> ${err.message}` }));
    }
}));
router.post('/delete', guards_1.isUser(), guards_1.isAdmin(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    console.log(ids);
    try {
        const count = yield userService_1.deleteManyById(ids);
        console.log(count);
        res.status(200).json({ 'message': `successfully deleted ${count} items` });
    }
    catch (err) {
        next(JSON.stringify({ 'message': `${err.message}` }));
    }
}));
router.put('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const body = req.body;
    try {
        yield userService_1.updateUser(userId, body);
    }
    catch (err) {
        console.log(err);
    }
}));
//# sourceMappingURL=usersController.js.map