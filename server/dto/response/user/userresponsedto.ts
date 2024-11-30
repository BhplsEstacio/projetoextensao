import { User } from "~/server/model/User";

export default class UserResponseDTO {
    token?: string;
    name: string;

    constructor(user: User, token?: string){
        this.name = user.name;
        this.token = token;
    }
}