import { rootApi } from ".";
import { User } from "../../../types/user";
import { setAuthState } from "../../features/auth/authSlice";
import { RootState } from "../../store";

interface LoginRequest {
    email: string,
    password: string,
}

interface LoginResponse {
    token: {
        access: string,
        refresh: string,
    }
}

interface SignupRequest {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
}

export const authApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => "me/",
            providesTags: ['User']
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: 'login/',
                method: 'POST',
                body
            }),
            onQueryStarted: async (id, { getState, dispatch, queryFulfilled}) => {
                try {
                    const { data } = await queryFulfilled
                    // console.log(data)
                    localStorage.setItem("refresh", data.token.refresh)
                    const user = (getState() as RootState).auth.user
                    dispatch(setAuthState({ user, token: data.token.access }))
                    // console.log("Received", data)
                } catch (error) {
                    console.log("Error", error)
                }
            },
            invalidatesTags: ['User']
        }),
        signup: builder.mutation<LoginResponse, SignupRequest>({
            query: (body) => ({
                url: 'signup/',
                method: 'POST',
                body
            }),
            onQueryStarted: async (id, { getState, dispatch, queryFulfilled}) => {
                try {
                    const { data } = await queryFulfilled
                    // console.log(data)
                    localStorage.setItem("refresh", data.token.refresh)
                    const user = (getState() as RootState).auth.user
                    dispatch(setAuthState({ user, token: data.token.access }))
                    // console.log("Received", data)
                } catch (error) {
                    console.log("Error", error)
                }
            },
            invalidatesTags: ['User']
        }),
    }),
})

export const {
    useLoginMutation,
    useSignupMutation,
    useGetUserQuery,
} = authApi