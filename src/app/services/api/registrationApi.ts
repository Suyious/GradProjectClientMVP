import { rootApi } from ".";
import { Registration } from "../../../types/registration";
import { Response } from "../../../types/response";

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
            providesTags: (result) => (
                result?
                    [...result.map(({ id }) => ({ type: 'Registration', id} as const)),
                    { type: 'Registration', id: 'LIST'}]
                : [{ type: 'Registration', id: 'LIST'}]
            )
        }),
        createNewResponse: builder.mutation<Response, { id: number, body: Response[]}>({
            query: ({ id, body }) => ({
                url: `/registrations/${id}/responses/`,
                method: 'POST',
                body,
            })
        })
    })
})

export const {
    useGetAllRegistrationsQuery,
    useCreateNewResponseMutation,
} = registrationApi;