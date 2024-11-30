import { z } from "zod";

export const UserAttributesParser = z.object({
    id: z.number().positive(),
    name: z.string().trim().min(3, "name must have at least 3 characters").max(255, "name can have only 255 characters"),
    email: z.string().trim().email("this is not a valid email").min(6, "email must have at least 6 characters").max(255, "email can have only 255 characters"),
    login: z.string().trim().min(5, "login must have at least 5 characters").max(100, "login can have only 100 characters"),
    password: z.string().trim().min(8, "password must have at least 8 characters").max(24, "password can have only 24 characters"),
});

export type UserAttributes = z.infer<typeof UserAttributesParser>;

export class User {
    id: number;
    name: string;
    email: string;
    login: string;
    password: string;

    constructor(attributes: UserAttributes) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.email = attributes.email;
        this.login = attributes.login;
        this.password = attributes.password;
    }
}