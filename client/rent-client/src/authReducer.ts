import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "./models/IUser";
import { login, register } from "./services/authService";
import { getCookieJWTInfo } from "./services/userService"
import jwt_decode from 'jwt-decode';
import { AppThunk } from "./store";
import { emptyUser } from "./constants";
const initialUser = getCookieJWTInfo();
const token = sessionStorage.getItem('SESSION_TOKEN');

interface AuthState {
    user: IUser | null,
    token: string | null,
    error: string | undefined;
}

const initialState: AuthState = {
    user: initialUser,
    token: token,
    error: undefined,
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = emptyUser;
            state.token = null;
        },
        loginSuccess(state, action: PayloadAction<AuthState>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = undefined;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    }
})

export const {
    logout,
    loginSuccess,
    loginFailure,
} = auth.actions
export default auth.reducer

export const submitLogout = (): AppThunk => async (dispatch, getState)=>{
    dispatch(logout());
}

export const submitLogin = (email: string, password: string): AppThunk => async (dispatch, getState) => {
    try {
        const resp = (await login(email, password))
        const token = resp['SESSION_TOKEN'];
        console.log(token);
        const loggedUser = jwt_decode(token) as IUser
        (loggedUser as any)['token'] = token;
        console.log('loggedUser', loggedUser);
        const st: AuthState = { token, user: loggedUser, error: undefined };

        dispatch(loginSuccess(st));

    } catch (err) {
        dispatch(loginFailure(JSON.stringify(err)))
    }
}

export const submitRegister = (values: any): AppThunk => async (dispatch, getState) => {
    try {
        const resp = (await register(values))
        const token = resp['SESSION_TOKEN'];
        console.log(token);
        const loggedUser = jwt_decode(token) as IUser
        (loggedUser as any)['token'] = token;
        console.log('loggedUser', loggedUser);
        const st: AuthState = { token, user: loggedUser, error: undefined };

        dispatch(loginSuccess(st));

    } catch (err) {
        dispatch(loginFailure(JSON.stringify(err)))
    }
}