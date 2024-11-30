import { User } from "~/server/model/User";

export default class UserCreateResponseDTO {
    id: number;
    name: string;
    email: string;
    login: string;
    token: string;

    constructor(account: User, token: string){
        this.id = account.id;
        this.name = account.name;
        this.email = account.email;
        this.login = account.login;
        this.token = token;
    }
}