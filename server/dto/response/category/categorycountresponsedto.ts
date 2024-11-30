import CategoryDTO from "../../request/category/categoryiddto";

export default class CategoryCountResponseDTO extends CategoryDTO{
    totaltasks: number

    constructor(id: number, name: string, totaltasks: number){
        super(id,name);
        this.totaltasks = totaltasks;
    }
}