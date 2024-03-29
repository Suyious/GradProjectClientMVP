import { rootApi } from '.';
import { MockTest } from '../../../types/mocktest'
import { Question } from '../../../types/question';
import { User } from '../../../types/user';

type MockTestResponse = {
    success: boolean,
    data: MockTest & {
        questions: Question[]
    },
}

type MockTestRegistrationsResponse = {
    id: number,
    user: User,
    score: number,
    test_id: number,
    created_at: string,
    responses: Response[]
}

export const mocktestsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTests: builder.query<MockTest[], { filter?: string}>({
            query: ({ filter }) => `tests?filter=${filter}`,
            providesTags: (result) => (
                result?
                    [...result.map(({ id }) => ({ type: 'MockTest', id} as const)),
                    { type: 'MockTest', id: 'LIST'}]
                : [{ type: 'MockTest', id: 'LIST'}]
            )
        }),
        getTestById: builder.query<MockTestResponse, string>({
            query: (id) => `tests/${id}/`,
            providesTags: (result, error, id) => [{ type: 'MockTest', id}]
        }),
        createNewTest: builder.mutation<MockTest, Partial<MockTest>>({
            query: (body) => ({
                url: 'tests/',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'MockTest', id: 'LIST'}]
        }),
        deleteTest: builder.mutation<void, number>({
            query: (id) => ({
                url: `tests/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'MockTest', id}]
        }),
        getTestAllQuestions: builder.query<Question[], string>({
            query: (id) => ({
                url: `tests/${id}/question/`,
                method: 'GET'
            })
        }),
        getTestAllRegistrations: builder.query<MockTestRegistrationsResponse[], string>({
            query: (id) => ({
                url: `tests/${id}/registrations/`,
            })
        }),
        registerForTest: builder.mutation<MockTestRegistrationsResponse, number>({
            query: (id) => ({
                url: `tests/${id}/registrations/`,
                method: 'POST'
            })
        })

    })
})

export const { 
    useGetAllTestsQuery,
    useGetTestByIdQuery,
    useCreateNewTestMutation,
    useDeleteTestMutation,
    useGetTestAllQuestionsQuery,
    useGetTestAllRegistrationsQuery,
    useRegisterForTestMutation,
} = mocktestsApi;