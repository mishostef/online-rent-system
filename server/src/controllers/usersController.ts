import { Router } from "express";
import { isAdmin, isUser } from "../middlewares/guards";
import { deleteManyById, deleteUserById, editUsers, getAllUsers, getUserById, updateUser } from "../services/userService";
import * as cors from 'cors';
import { IUserIdentifiable } from "../models/interfaces/IUserIdentifiable";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        console.dir(JSON.stringify(users));
        res.status(201).json(users);
    } catch (err) {
        res.status(404).json({ message: err })
    }
})

router.put('/', cors(), async (req, res, next) => {
    const newUsers = req.body.edited as IUserIdentifiable[];
    console.log(newUsers);
    try {
        await editUsers(newUsers);
        res.status(200).json({ message: `${newUsers.length} documents successfully updated` })
    } catch (err) {
        console.log(err);
        next(JSON.stringify({ status: 500, message: err.message || Object.values(err.errors).map(el => el['message']).join('\n') }));
    }
})

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await getUserById(userId);
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({ message: err })
    }
})

router.delete('/:userId', async (req, res, next) => {
    const userId = req.params.userId
    try {
        const deleted = await deleteUserById(userId);
        res.status(200).json({ 'message': `successfully deleted ${deleted.email}` });
    } catch (err) {
        console.log(err);
        next(JSON.stringify({ "message": `in next err handler=> ${err.message}` }));
    }
})

router.post('/delete', isUser(), isAdmin(), async (req, res, next) => {
    const ids = req.body.ids;
    console.log(ids);
    try {
        const response = await deleteManyById(ids)
        console.log(response);
        console.log(`deleted number is... ${response.result.n}`);
        res.status(200).json({ status: 200, 'message': ` ok:${response.result.ok == 1} successfully deleted ${response.result.n} items` })
    } catch (err) {
        next(JSON.stringify({ 'message': `${err.message}` }));
    }
}
);

router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const body = req.body
    try {
        await updateUser(userId, body);
    } catch (err) {
        console.log(err);
    }
})



export { router }