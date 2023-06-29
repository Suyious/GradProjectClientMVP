export type Registration = {
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