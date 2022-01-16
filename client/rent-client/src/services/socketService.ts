import socketIOClient from 'socket.io-client';
import { baseAddress } from '../constants';
import { IUser } from '../models/IUser';

export default function initiate(socket: any, user: IUser, appendMessage: (message: string) => void, chatActive: boolean): any {

    // const socket = socketIOClient(baseAddress, { transports: ['websocket', 'polling', 'flashsocket'] });
    if (!chatActive || !user) {
        try {
            socket.disconnect();
        } catch (error: any) {
            console.log(`socket err:${error.message}`);
        }
        return;
    }
    
    
    socket.emit('newuser', user.email);

    socket.on('msg', (message: string) => {
        appendMessage(`${message}`)
    })

   
    socket.on('userconnected', (name:string) => {
        appendMessage(`${name} connected!`);
    })

    socket.on('userdisconnected', (name: string) => {
        appendMessage(`${name} disconnected`)
    })
     return socket;
}





