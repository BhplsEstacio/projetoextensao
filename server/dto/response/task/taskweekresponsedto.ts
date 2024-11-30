import TaskResponseDTO from "./taskresponsedto";

export default class TaskWeekResponseDTO {
    date: string;
    tasks: TaskResponseDTO[];

    constructor(date: string, tasks: TaskResponseDTO[]){
        this.date = date;
        this.tasks = tasks;
    }
}