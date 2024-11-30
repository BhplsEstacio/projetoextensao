import StatusEnum from "../enum/StatusEnum";
import { Category } from "./Category";

export class Task {
    id: number;
    userId: number;
    name: string;
    description?: string | null;
    deadline?: Date | null;
    created?: Date | null;
    finished?: Date | null;
    status?: StatusEnum | null;
    categories: Category[];

    constructor(
        attributes: {
            id: number,
            userId: number,
            name: string,
            description?: string | null,
            deadline?: Date | null,
            created?: Date | null,
            finished?: Date | null,
            status?: StatusEnum | null,
            categories: Category[]
        }
    ) {
        this.id = attributes.id;
        this.userId = attributes.userId;
        this.name = attributes.name;
        this.description = attributes.description;
        this.deadline = attributes.deadline;
        this.created = attributes.created;
        this.finished = attributes.finished;
        this.status = attributes.status;
        this.categories = attributes.categories;
    }
}