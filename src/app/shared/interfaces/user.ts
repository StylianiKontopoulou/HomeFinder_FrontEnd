export interface User {
    id: number;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface LoggedInUser {
    fullname: string;
    email: string;
}