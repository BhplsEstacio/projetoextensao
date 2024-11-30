import StatusEnum from "~/server/enum/StatusEnum";
import CategoryDTO from "../../request/category/categoryiddto";
import { Task } from "~/server/model/Task";

export default class TaskResponseDTO {
    id: number;
    name: string;
    description?: string | null;
    deadline?: Date | null;
    created?: Date | null;
    finished?: Date | null;
    status?: StatusEnum | null;
    categories: CategoryDTO[];

    constructor(entity: Task){
        this.id = entity.id;
        this.name = entity.name;
        this.description = entity.description;
        this.deadline = entity.deadline;
        this.created = entity.created;
        this.finished = entity.finished;
        this.status = entity.status;
        this.categories = entity.categories.map(({id,name})=>(new CategoryDTO(id,name)));
    }
}