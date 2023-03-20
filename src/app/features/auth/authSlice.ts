import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/user";
import { authApi } from "../../services/api/authApi";
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
        setAuthStateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        setAuthStateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        logout: (state) => {
            localStorage.removeItem('refresh')
            state.user = null;
            state.token = null;
            authApi.util.invalidateTags(['User'])
        }
    }
})

export const { setAuthState, setAuthStateUser, setAuthStateToken, logout } = authSlice.actions
export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
export default authSlice.reducer