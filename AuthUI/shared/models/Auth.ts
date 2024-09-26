export class Login {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export interface User {
    id: string;
    email: string;
    jwt: string;
}
