import { Router } from "express";
import { userRole as role } from '../models/enums';
import { isGuest } from '../middlewares/guards';
import { constants } from "../config/constants";
const router = Router();


router.post('/register', isGuest(), async (req, res, next) => {

    console.log(req.body);

    const { email, password, firstName, lastName } = req.body;
    const role = +req.body.role;
    try {
        const regex = /\S+@\S+\.\S+/gm;
        const isValidEmail = (regex.test(req.body.email));
        const isLongEnough = (req.body.email.length > 3);
        if (!isValidEmail) throw new Error(`Invalid Email`);
        if (req.body.password.trim() < 3) throw new Error(`Password is too short`);
        if (firstName < 2) throw new Error(`firstname is too short`);
        if (lastName < 2) throw new Error(`lastname is too short`);
        const token = await req['auth'].register(email, password, firstName, lastName, role);
        res.status(201).json({ [constants.COOKIE_NAME]: token });
        return;
        //res.status(201).json({ message: "success" });
    } catch (err) {
        next(JSON.stringify({ status: err.status || 404, message: err.message }));
    }
});



router.post('/login', isGuest(), async (req, res, next) => {

    try {
        console.log(req.body);
        const token = await req['auth'].login(req.body.email, req.body.password);

        res.status(200).json({ [constants.COOKIE_NAME]: token });
    } catch (err) {
        console.log(err);
        next(JSON.stringify({ status: err.status || 404, message: err.message }));
    }
});

router.get('/logout', (req, res) => {
    req['auth'].logout();
    res.redirect('/');
});

export { router };