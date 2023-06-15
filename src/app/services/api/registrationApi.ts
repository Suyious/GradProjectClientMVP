import { rootApi } from ".";

type Registration = {
    id: number,
    user: {
        first_name: string,
        last_name: string,
        username: string,
        email: string,
    },
    score: number,
    test: number,
    created_at: string,
    responses: []
}

type FilterParams = {
    user: string,
    test: string
}

export const registrationApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRegistrations: builder.query<Registration[], FilterParams>({
            query: (params) => ({
                url: `/registrations/`,
                params: {
                    user: params.user,
                    test: params.test,
                },
            }),
        })
    })
})

export const {
    useGetAllRegistrationsQuery,
} = registrationApi;