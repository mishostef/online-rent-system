import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Request, Response } from "express";
import { auth as authMiddleware } from '../middlewares/auth'
import * as cors from 'cors';
import * as os from 'os';

export const expressConfig = (app: express.Application) => {
    app.use('/static', express.static('static'));
    app.use(express.json());
    app.use(cookieParser());
    app.use(authMiddleware());

    var networkInterfaces = os.networkInterfaces();

    const myIP = (networkInterfaces['Local Area Connection'][1]['address']);
    console.log(myIP);
    app.options(`http://${myIP.toString()}:3000`, cors());
    const corsOptions = {
        origin: [`http://${myIP.toString()}:3000`, `http://localhost:3000`],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: '*',
        optionsSuccessStatus: 200,// some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    }

    app.use(cors(corsOptions));

    app.use((req: Request, res: Response, next) => {
        console.log(">>>", req.method, req.url, `headers: ${JSON.stringify(req.headers['authorization'])}`);
        if (req['user']) {
            console.log(`known user`, req['user'].email);
        }
        next();
    });
};

