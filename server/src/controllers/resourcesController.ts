import { Router } from "express";
import { appendFile } from "fs";
const router = Router();
import * as multer from 'multer';
import { createResource, editResource, getAllResources, getResourceById, deleteResourceById, likeResource, getResourceComments } from '../services/resourceService'
import { addComment, editComment } from '../services/commentService'
import { bookResource } from "../services/userService";


var date = Date.now()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static')
    },
    filename: function (req, file, cb) {
        let ext = getExtension(file.originalname);
        date = Date.now();
        cb(null, `${file.originalname}-${date}` + ext)
    }
});
const upload = multer({ storage: storage })

router.post('/', upload.single('selectedFile'), async (req, res) => {

    const f = req.file;
    console.log(f);
    const ext = getExtension(f.originalname);
    const imageName = `${f.originalname}-${date}${ext}`;
    console.log(`imageName = ${imageName}`);
    const body = req.body;
    console.log(body);
    try {
        const resource = await createResource(imageName, body);
        console.dir(resource);
        res.status(201).json({ imageName: imageName });
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const allResources = await getAllResources();
        //console.log(allResources);
        res.status(200).json(allResources);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message })
    }
})
function getExtension(originalname: string) {
    return originalname.substring(originalname.lastIndexOf('.'), originalname.length);
}

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const resource = await getResourceById(id)
        res.status(200).json(resource);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
})


router.get('/:resourceId/comments', async (req, res) => {
    const resourceId = req.params.resourceId;
    try {
        const comments = await getResourceComments(resourceId);
        res.status(200).json(comments)
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
})

router.post('/:resourceId', async (req, res) => {

    const resourceId = req.params.resourceId;
    console.log(resourceId);
    const { userId } = req.body;
    console.log(`userId =${userId}`);
    try {
        if (!userId) throw new Error('You are not signed in!');
        await bookResource(resourceId, userId);
        res.status(200).json({ message: `Successfully booked ${resourceId}` });

    } catch (err) {
        res.status(401).json({ message: err.message })
    }
})


router.post(`/:resourceId/likes`, async (req, res, next) => {
    const resourceId = req.params.resourceId;
    const likes = req.body.likes;
    console.log(`resourceId=${resourceId},likes=${likes}`);
    try {
        await likeResource(resourceId, likes);
        res.status(200).json({ message: `successfully liked${resourceId}` });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.put('/:resourceId', upload.single('selectedFile'), async (req, res) => {
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
        await editResource(resourceId, body)
    } catch (err) {
        console.log(err);
    }

})

router.post(`/:resourceId/comments`, async (req, res) => {
    const resourceId = req.params.resourceId;
    const text = req.body;
    console.log(text);
    try {
        await addComment(resourceId, text);
        res.status(201).json({ message: 'successfully added comment' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

router.put(`/:resourceId/comments/:commentId`, async (req, res) => {
    const commentId = req.params.commentId;
    const body = req.body;
    const newText = body.text;
    console.log(body);

    console.log(commentId);
    try {
        await editComment(commentId, newText);
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:resourceId', async (req, res) => {
    const resourceId = req.params.resourceId;
    try {
        await deleteResourceById(resourceId);
        res.status(200).json({ message: `successfully deleted${resourceId}` });
    } catch (err) {
        console.log(err)
        res.json({ message: err.message });
    }
})

export { router };

