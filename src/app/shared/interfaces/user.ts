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

export interface UpdateUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
}