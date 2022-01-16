
import * as express from "express";
import { router as authController } from '../controllers/authController';
import { router as resourcesController } from '../controllers/resourcesController';
import { router as usersController } from '../controllers/usersController';
import { router as commentsController } from '../controllers/commentsController';

export const routeConfig = (app: express.Application) => {
    app.use('/auth', authController);
    app.use('/api/resources', resourcesController);
    app.use('/api/comments', commentsController);
    app.use('/users', usersController);

    app.use((err, req, res, next) => {
        console.log(err);
        let jsonErr = { status: 500, message: '' };
        try {
            jsonErr = JSON.parse(err);
            console.log(err);
        } catch (err) {
            //console.log(err.message);
        }
        const status = err.status || jsonErr.status;
        const message = err.message || jsonErr.message;
        if (status && message) {
            res.status(status).json(message);
        }
        else res.status(500).send(err);
    });
}