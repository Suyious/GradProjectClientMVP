export type MockTest = {
    id: number,
    author: {
        first_name: string,
        last_name: string,
        username: string,
        email: string,
    },
    name: string, 
    description: string,
    created_at: string,
    starts_at: string,
    duration: string,
    isTestOnline: boolean,
    isTestAvailable: boolean,
    isTestOffline: boolean
    endsAt: string,
}