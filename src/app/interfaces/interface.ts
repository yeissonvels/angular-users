export interface LoginResponse {
    success: number
    user: User
    msg: string
}

export interface HttpResponse {
    success: number
    msg: string
}

export interface User {
    id: number
    username: string
    password: string
    email: string
}