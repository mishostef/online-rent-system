
import axios, { AxiosResponse } from "axios";
import { loginAddress, registerAddress, usersAddress } from "../constants";
import { options } from "./userService";
const token = (sessionStorage.getItem('SESSION_TOKEN'))
//if (token) axios.defaults.headers.common['authorization'] = token;




async function editUser(id: string, values: any) {
    await axios.put(`${usersAddress}/${id}`, values);
}

async function register(values: any) {
    const res = await axios.post(registerAddress, values, options());
    console.log(res);
    console.log(res.data);
    //authenticate(res);
    return res.data;
}

async function login(email: string, password: string) {
    const res = await axios.post(`${loginAddress}`, { "email": email, password: password });
    console.log(res);
    console.log(res.data);
    //authenticate(res);
    return res.data;

}

function authenticate(res: AxiosResponse<any, any>) {
  sessionStorage.setItem('SESSION_TOKEN', res.data['SESSION_TOKEN']);
  axios.defaults.headers.common['authorization'] = res.data['SESSION_TOKEN'];
}

export {
    editUser,
    login,
    register
}


