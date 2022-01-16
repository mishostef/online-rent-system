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
const router = express_1.Router();
exports.router = router;
const multer = require("multer");
const resourceService_1 = require("../services/resourceService");
const commentService_1 = require("../services/commentService");
const userService_1 = require("../services/userService");
var date = Date.now();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static');
    },
    filename: function (req, file, cb) {
        let ext = getExtension(file.originalname);
        date = Date.now();
        cb(null, `${file.originalname}-${date}` + ext);
    }
});
const upload = multer({ storage: storage });
router.post('/', upload.single('selectedFile'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const f = req.file;
    console.log(f);
    const ext = getExtension(f.originalname);
    const imageName = `${f.originalname}-${date}${ext}`;
    console.log(`imageName = ${imageName}`);
    const body = req.body;
    console.log(body);
    try {
        const resource = yield resourceService_1.createResource(imageName, body);
        console.dir(resource);
        res.status(201).json({ imageName: imageName });
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allResources = yield resourceService_1.getAllResources();
        //console.log(allResources);
        res.status(200).json(allResources);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}));
function getExtension(originalname) {
    return originalname.substring(originalname.lastIndexOf('.'), originalname.length);
}
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const resource = yield resourceService_1.getResourceById(id);
        res.status(200).json(resource);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}));
router.get('/:resourceId/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resourceId = req.params.resourceId;
    try {
        const comments = yield resourceService_1.getResourceComments(resourceId);
        res.status(200).json(comments);
    }
    catch (err) {
        res.status(400).json({ "message": err.message });
    }
}));
router.post('/:resourceId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resourceId = req.params.resourceId;
    console.log(resourceId);
    const { userId } = req.body;
    console.log(`userId =${userId}`);
    try {
        if (!userId)
            throw new Error('You are not signed in!');
        yield userService_1.bookResource(resourceId, userId);
        res.status(200).json({ message: `Successfully booked ${resourceId}` });
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
}));
router.post(`/:resourceId/likes`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resourceId = req.params.resourceId;
    const likes = req.body.likes;
    console.log(`resourceId=${resourceId},likes=${likes}`);
    try {
        yield resourceService_1.likeResource(resourceId, likes);
    }
    catch (err) {
        console.log(err);
    }
}));
router.put('/:resourceId', upload.single('selectedFile'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resourceId = req.params.resourceId;
    const body = req.body;
    const f = req.file;
    console.log(f);
    const ext = getExtension(f.originalname);
    const imageName = `${f.originalname}-${date}${ext}`;
    console.log(`imageName = ${imageName}`);
    body.imageName = imageName;
    console.log(body);
    try {
        yield resourceService_1.editResource(resourceId, body);
    }
    catch (err) {
        console.log(err);
    }
}));
router.post(`/:resourceId/comments`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resourceId = req.params.resourceId;
    const text = req.body;
    console.log(text);
    try {
        yield commentService_1.addComment(resourceId, text);
        res.status(201).json({ message: 'successfully added comment' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}));
router.put(`/:resourceId/comments/:commentId`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    const body = req.body;
    const newText = body.text;
    console.log(body);
    console.log(commentId);
    try {
        yield commentService_1.editComment(commentId, newText);
    }
    catch (err) {
        console.log(err);
    }
}));
router.delete('/:resourceId', (req, res) => {
    const resourceId = req.params.resourceId;
    try {
        resourceService_1.deleteResourceById(resourceId);
        res.status(200).json({ message: `successfully deleted${resourceId}` });
    }
    catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});
//# sourceMappingURL=resourcesController.js.map