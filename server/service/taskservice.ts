import { TaskCreateRequestDTO } from "../dto/request/task/taskcreaterequestdto";
import { TaskSearchRequestDTO } from "../dto/request/task/tasksearchrequestdto";
import { TaskUpdateRequestDTO } from "../dto/request/task/taskupdaterequestdto";
import { TaskWeekSearchRequestDTO } from "../dto/request/task/taskweeksearchrequestdto";
import TaskWithCategoriesAbstractDTO from "../dto/request/task/taskwithcategoriesabstractdto";
import TaskResponseDTO from "../dto/response/task/taskresponsedto";
import TaskWeekResponseDTO from "../dto/response/task/taskweekresponsedto";
import EntityNotFound from "../error/custom/entitynotfound";
import TaskRepository from "../repository/taskrepository";
import CategoryService from "./categoryservice";

export default class TaskService {
    repository = new TaskRepository();
    categoryService = new CategoryService();

    async findById(userId: number,id: number){
        const task = await this.repository.findById(userId,id);

        if(!task){
            throw new EntityNotFound('Task');
        }

        return new TaskResponseDTO(task);
    }

    async findAll(userId: number, search: TaskSearchRequestDTO){
        const list = await this.repository.findAll(userId,search);
        return list.map((task)=>(new TaskResponseDTO(task)));
    }

    async findByWeek(userId: number, search: TaskWeekSearchRequestDTO){
        const baseDate = new Date();
        let today = new Date(baseDate.valueOf() - (baseDate.getTimezoneOffset() * 60000));
        let day = (today.getDay() === 0 ? 7:today.getDay()) - 1;
        const week = (search.page ?? 0) * (7 * 86400000);
        let since = new Date(today.getTime() - (day * 86400000) + week);
        let until = new Date(since.getTime() + (6 * 86400000));
        console.log("today "+today,"since "+since,"until "+until);

        const list = await this.repository.findAll(userId,{since,until});

        const taskMap = new Map<string,TaskWeekResponseDTO>();

        for(let i = 0;i<7;i++){
            const date = new Date(since.getTime() + (i * 86400000));
            const dateString = date.toISOString().split('T')[0];
            taskMap.set(dateString,new TaskWeekResponseDTO(dateString,[]));
        }

        list.forEach((task)=>{
            const date = String(task.deadline?.toISOString().split('T')[0]);
            taskMap.get(date)?.tasks.push(new TaskResponseDTO(task));
        });

        return [...taskMap.values()];
    }

    async create(userId: number, dto: TaskCreateRequestDTO){
        const categoriesIds = await this.mapCategories(userId,dto);
        
        const task = await this.repository.create(userId,dto,categoriesIds);

        return new TaskResponseDTO(task);
    }

    async updateTask(userId: number, id: number, dto: TaskUpdateRequestDTO){
        const foundedTask = await this.findById(userId,id);

        const categories = await this.mapCategories(userId,dto);

        const categoriesIds = categories?.map(({id})=>(id));

        const foundedTasksCategoriesIds = foundedTask.categories.map(({id})=>({id}));

        const disconnect = categoriesIds ? foundedTasksCategoriesIds.filter(({id})=>(!categoriesIds.includes(id))) : foundedTasksCategoriesIds;
        
        const task = await this.repository.updateTask(userId,id,dto,disconnect,categories);

        return new TaskResponseDTO(task);
    }

    async delete(userId: number, id: number){
        await this.findById(userId,id);
        await this.repository.deleteTask(id);
    }
    
    private async mapCategories(userId: number, dto: TaskWithCategoriesAbstractDTO){
        if(!dto.categories){
            return undefined;
        }

        const categoriesNames = dto.categories.map(({name})=>(name));
        const categoriesIds = await this.categoryService.findByNames(userId,categoriesNames);

        const categoriesIdsNames = categoriesIds.map(({name})=>(name));

        dto.categories = dto.categories.filter(({name})=>(!categoriesIdsNames.includes(name)));
        return categoriesIds;
    }
}