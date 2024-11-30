import prisma from "../database/client"

export default class CategoryRepository {

    async findAll(userId: number){
        return await prisma.category.findMany({
            where: {
                userId
            },
            include: {
                tasks: true
            }
        })
    }

    async findByNames(userId: number, names: string[]){
        return await prisma.category.findMany({
            where: {
                userId,
                name: {
                    in: names
                }
            },
            distinct: "id"
        })
    }
}