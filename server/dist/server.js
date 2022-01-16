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
const database_1 = require("./config/database");
const express = require("express");
const express_1 = require("./config/express");
const routes_1 = require("./config/routes");
const socket_io_1 = require("socket.io");
const app = express();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.startDb();
            express_1.expressConfig(app);
            routes_1.routeConfig(app);
            const server = app.listen(3030, () => console.log(`running...`));
            const io = new socket_io_1.Server(server, {
                cors: {
                    origin: ["http://localhost:3000"],
                    allowedHeaders: '*',
                    credentials: true
                }
            });
            const users = {};
            io.on("connection", (socket) => {
                socket.join(`room1`);
                socket.on('msg', (message) => {
                    io.to("room1").emit('msg', `${message}   ${users[socket.id]}`);
                });
                socket.on('newuser', name => {
                    users[socket.id] = name;
                    socket.broadcast.emit('userconnected', name);
                });
                socket.on('disconnect', () => {
                    socket.broadcast.emit('userdisconnected', users[socket.id]);
                    delete users[socket.id];
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
start();
//# sourceMappingURL=server.js.map