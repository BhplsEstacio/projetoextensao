import prisma from "../database/client";
import CategoryDTO from "../dto/request/category/categoryiddto";
import { TaskCreateRequestDTO } from "../dto/request/task/taskcreaterequestdto";
import { TaskSearchRequestDTO } from "../dto/request/task/tasksearchrequestdto";
import { TaskUpdateRequestDTO } from "../dto/request/task/taskupdaterequestdto";
import { Task } from "../model/Task";

export default class TaskRepository {

    async findById(userId: number, id: number): Promise<Task | null> {
        return await prisma.task.findUnique({
            where: {
                id,
                userId
            },
            include: {
                categories: true
            }
        })
    }

    async findAll(userId: number, {name,status,categories,since,until}: TaskSearchRequestDTO): Promise<Task[]>{
        return await prisma.task.findMany({
            where: {
                userId,
                name: (name ? {
                    contains: name,
                    mode: 'insensitive'
                } : undefined),
                status: (status ? {
                    equals: status
                } : undefined),
                categories: (categories ? {
                    some: {
                        name: {
                            in: categories,
                            mode: 'insensitive'
                        }
                    }
                } : undefined),
                deadline: {
                    gte: (since ? new Date(since) : undefined),
                    lte: (until ? new Date(until) : undefined)
                }
            },
            include: {
                categories: true
            }
        })
    }

    async create(userId: number, data: TaskCreateRequestDTO, categoriesIds?: CategoryDTO[]) : Promise<Task>{
        const create = data.categories?.map(({name})=>({userId,name}));
        const connect = categoriesIds?.map(({id})=>({id}));
        return await prisma.task.create({
            data: {
                userId,
                ...data,
                categories: {
                    create,
                    connect
                }
            },
            include: {
                categories: true
            }
        });
    }

    async updateTask(userId: number, id: number, data: TaskUpdateRequestDTO, disconnect: {id: number}[], categoriesIds?: CategoryDTO[]) : Promise<Task>{
        const create = data.categories?.map(({name})=>({userId,name}));
        const connect = categoriesIds?.map(({id})=>({id}))
        return await prisma.task.update({
            data: {
                ...data,
                categories: {
                    create,
                    connect,
                    disconnect
                }
            },
            where: {
                id
            },
            include: {
                categories: true
            }
        });
    }

    async deleteTask(id: number) : Promise<void> {
        await prisma.task.delete({where: {id}});
    }
}