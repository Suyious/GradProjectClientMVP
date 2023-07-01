import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { logout, setAuthState } from "../../features/auth/authSlice";
import { RootState } from "../../store";

interface RefreshResultData {
    access: string | null
}

const baseQueryWithReAuth:BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const refresh = localStorage.getItem('refresh')
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery({
            url: '/api/token/refresh/',
            method: 'POST',
            body: { "refresh": refresh }
        }, api, extraOptions)
        if (refreshResult.data) {
            const user = (api.getState() as RootState).auth.user
            api.dispatch(setAuthState({token: (refreshResult.data as RefreshResultData).access, user}))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
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
    tagTypes: ['User', 'MockTest', 'Registration'],
    endpoints: () => ({}),
})
