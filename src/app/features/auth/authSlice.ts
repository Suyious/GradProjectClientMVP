import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/user";
import { RootState } from "../../store";

export interface AuthState {
    user: User | null,
    token: string | null
}

const initialState: AuthState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { setAuthState, logout } = authSlice.actions
export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
export default authSlice.reducer