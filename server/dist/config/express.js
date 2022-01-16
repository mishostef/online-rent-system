"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressConfig = void 0;
const cookieParser = require("cookie-parser");
const express = require("express");
const auth_1 = require("../middlewares/auth");
const cors = require("cors");
const os = require("os");
exports.expressConfig = (app) => {
    app.use('/static', express.static('static'));
    app.use(express.json());
    app.use(cookieParser());
    app.use(auth_1.auth());
    var networkInterfaces = os.networkInterfaces();
    const myIP = (networkInterfaces['Local Area Connection'][1]['address']);
    console.log(myIP);
    app.options(`http://${myIP.toString()}:3000`, cors());
    const corsOptions = {
        origin: [`http://${myIP.toString()}:3000`, `http://localhost:3000`],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: '*',
        optionsSuccessStatus: 200,
        credentials: true
    };
    app.use(cors(corsOptions));
    app.use((req, res, next) => {
        console.log(">>>", req.method, req.url, `headers: ${JSON.stringify(req.headers['authorization'])}`);
        if (req['user']) {
            console.log(`known user`, req['user'].email);
        }
        next();
    });
};
//# sourceMappingURL=express.js.map