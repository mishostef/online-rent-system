import { Server } from "socket.io";
import * as sio from "socket.io";

interface ServerToClientEvents {
    msg: (message: string) => void;
    userconnected: (name: string) => boolean;
    userdisconnected: (user: string) => boolean;
}

interface ClientToServerEvents {
    msg: (message: string, email: string) => void;
    newuser: (name: string) => void

}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;

}

export {
    SocketData, InterServerEvents, ClientToServerEvents, ServerToClientEvents
}