import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { IUser } from '../models/IUser';
import { editUser } from '../services/authService';
import { baseAddress, editInitialValues } from '../constants';
import { userRole } from '../enums/Role';
import socketIOClient from 'socket.io-client';
import instantiate from '../services/socketService';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Inbox } from '@material-ui/icons';

const validationSchema = yup.object({
    email: yup
        .string()
        .email()
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
    firstName: yup
        .string()
        .required('firstName is required'),
    lastName: yup
        .string()
        .required('firstName is required'),

});


const Profile: React.FC<{ user: IUser }> = ({ user }) => {
    const formik = useFormik({
        initialValues: editInitialValues(),
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            await editUser(user!._id!, values);
            resetForm();
        }

    });

    const socket = socketIOClient(baseAddress, { transports: ['websocket', 'polling', 'flashsocket'] });
    const [chatActive, setchatActive] = useState(socket.connected);
    const [messages, setMessages] = useState<string[]>([]);
    socket.connect();

    useEffect(() => {

        socket.emit('newuser', user.email);

        socket.on('msg', (message: string) => {
            appendMessage(`${message}`)
        })


        // socket.on('userconnected', (nname) => {
        //    if (nname)
        //         appendMessage(`${nname} connected!`);
        // })

        // socket.on('userdisconnected', (name) => {
        //      if (name)
        //          appendMessage(`${name} disconnected`)
        //  })


        return () => {
            socket.disconnect();
        }
    }, []);


    function appendMessage(message: string) {
        //if (!message.startsWith(user.email))
        setMessages(oldArr => [...oldArr, message]);
    }

    function handleMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!socket.connected) return;
        const message = new FormData(e.target as HTMLFormElement).get('message-input');
        appendMessage(`You: ${message}`);
        socket.emit('msg', message, user.email);
        (e.target as HTMLFormElement).reset();
    }


    function handleCheck(): void {
        setTimeout(() => {
            socket.connected ? socket.disconnect() : socket.connect();
            setchatActive(!socket.connected);
        }, 1000);

    }

    if (!user.email) return (<div>Loading..</div>)
    return (
        <>
            <div>

                <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />

                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />


                    <div className="form-control">
                        <input
                            type="radio"
                            value="Owner"
                            name="userRole"
                            checked={+formik.values.role === userRole.Owner}
                            onChange={formik.handleChange}
                        />
                        <label>Owner</label>
                    </div>

                    <div className="form-control">
                        <input
                            type="radio"
                            value="Guest"
                            name="userRole"
                            checked={+formik.values.role === userRole.Guest}
                            onChange={formik.handleChange}
                        />
                        <label>Guest</label>
                    </div>


                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                    <Button type='reset' color="secondary" variant="contained">Reset</Button>
                </form>
            </div>

            <button onClick={handleCheck}> chatActive:{chatActive.toString()}</button>
            <form id="send-container" onSubmit={(e) => handleMessage(e)}>
                <input type="text" name="message-input" id="message-input" />
                <button type="submit" id="send-button">Send</button>
            </form>


            <List component="nav" aria-label="main mailbox folders">
                {messages.map(m => (< ListItem button>
                    <ListItemIcon>
                        <Inbox />
                    </ListItemIcon>
                    <ListItemText primary={m} />
                </ListItem>))
                }
            </List>

        </>
    );
};

export default Profile;



