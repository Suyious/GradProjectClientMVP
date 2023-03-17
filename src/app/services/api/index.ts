import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { AuthState, logout, setAuthState } from "../../features/auth/authSlice";
import { RootState } from "../../store";

const baseQueryWithReAuth:BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const refresh = localStorage.getItem('refresh')
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery({
            url: '/api/token/refresh',
            method: 'POST',
            body: { "refresh": refresh }
        }, api, extraOptions)
        console.log("refresh results")
        if (refreshResult.data) {
            const user = (api.getState() as RootState).auth.user
            api.dispatch(setAuthState({token: (refreshResult.data as AuthState).token, user}))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    // credentials: "include",
    prepareHeaders: ( headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if(token) headers.set('Authorization', `Bearer ${token}`)
        return headers
    }
})

export const rootApi = createApi({
    reducerPath: "rootApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['User', 'MockTest'],
    endpoints: () => ({}),
})