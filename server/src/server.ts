import { startDb } from './config/database'
import * as express from 'express';
import { expressConfig } from './config/express';
import { routeConfig } from './config/routes';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './socket';
import { Server } from 'socket.io';
import * as cors from 'cors';

const app = express();
async function start() {
    try {
        await startDb();
        expressConfig(app);
        routeConfig(app);

        const server = app.listen(3030, () => console.log(`running...`));




        const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server,
            {
                cors: {
                    origin: ["http://localhost:3000"],
                    allowedHeaders: '*',//["my-custom-header"],
                    credentials: true
                }
            })
        const users = {}


        io.on("connection", (socket) => {
            socket.join(`room1`);
            socket.on('msg', (message, email) => {
                io.to("room1").emit('msg', `${message}    ${email}`)//${users[socket.id]}-shows user only first 
                // time,  then undefined
            })

            socket.on('newuser', name => {
                users[socket.id] = name
                socket.broadcast.emit('userconnected', name)
            })

            socket.on('disconnect', () => {
                socket.broadcast.emit('userdisconnected', users[socket.id])
                delete users[socket.id]
            })

        });




    } catch (err) {
        console.log(err);
    }
}



start();


