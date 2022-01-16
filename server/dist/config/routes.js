"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeConfig = void 0;
const authController_1 = require("../controllers/authController");
const resourcesController_1 = require("../controllers/resourcesController");
const usersController_1 = require("../controllers/usersController");
const commentsController_1 = require("../controllers/commentsController");
exports.routeConfig = (app) => {
    app.use('/auth', authController_1.router);
    app.use('/api/resources', resourcesController_1.router);
    app.use('/api/comments', commentsController_1.router);
    app.use('/users', usersController_1.router);
    app.use((err, req, res, next) => {
        console.log(err);
        let jsonErr = { status: 500, message: '' };
        try {
            jsonErr = JSON.parse(err);
            console.log(err);
        }
        catch (err) {
            //console.log(err.message);
        }
        const status = err.status || jsonErr.status;
        const message = err.message || jsonErr.message;
        if (status && message) {
            res.status(status).json(message);
        }
        else
            res.status(500).send(err);
    });
};
//# sourceMappingURL=routes.js.map