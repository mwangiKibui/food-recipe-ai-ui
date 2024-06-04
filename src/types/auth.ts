interface User {
    _id:string;
    name:string;
    email:string;
    isVerified:boolean;
}

interface LoginDataResponse {
    accessToken:string;
    user: User
}


export type LoginPayload = {
    email:string;
    password:string;
}

export interface LoginAPIResponse {
    success: boolean;
    message: string;
    data: LoginDataResponse;
}

export interface LogoutAPIResponse {
    success: boolean;
    message: string;
}


export interface RegisterAPIResponse {
    success: boolean;
    message: string;
}

export type RegisterPayload = {
    name:string;
    email:string;
    password:string;
}