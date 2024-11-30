import prisma from "../database/client";
import { UserCreateRequestDTO } from "../dto/request/user/usercreaterequestdto";
import { UserNameUpdateRequestDTO } from "../dto/request/user/usernameupdaterequestdto";
import { User } from "../model/User";

export default class UserRepository {

    async findById(id:number) : Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async findByCredentials(login: string,email: string) : Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        login
                    },
                    {
                        email
                    }
                ]
            }
        })
    }

    async findByCredential(credential: string) : Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        login: credential
                    },
                    {
                        email: credential
                    }
                ]
            }
        })
    }

    async create(data: UserCreateRequestDTO) : Promise<User> {
        return await prisma.user.create({data});
    }

    async update(id: number, data: UserNameUpdateRequestDTO) : Promise<User> {
        return await prisma.user.update({
            data,
            where: {id}
        });
    }

    async deleteUser(id: number) : Promise<void> {
        await prisma.user.delete({where: {id}});
    }

}