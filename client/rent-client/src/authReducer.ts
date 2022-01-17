import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "./models/IUser";
import { login } from "./services/authService";
import { getCookieJWTInfo } from "./services/userService"
import History from "react-router-dom";
import { AppThunk } from "./store";
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
    loginSuccess,
    loginFailure,
} = auth.actions
export default auth.reducer


export const submitLogin = (email: string, password: string): AppThunk => async (dispatch, getState) => {
    try {
        const loggedUser = await login(email, password);
        dispatch(loginSuccess(loggedUser));
        // replace in history the Login with requested protected page ang go to it OR go to / if no requested page
        //history.replace(requestedUrl ? requestedUrl : '/');
    } catch (err) {
        dispatch(loginFailure(JSON.stringify(err)))
    }
}