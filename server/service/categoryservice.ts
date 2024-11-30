import CategoryDTO from "../dto/request/category/categoryiddto";
import CategoryCountResponseDTO from "../dto/response/category/categorycountresponsedto";
import CategoryRepository from "../repository/categoryrepository";

export default class CategoryService {
    repository = new CategoryRepository();

    async findByNames(userId: number, names: string[]){
        const list = await this.repository.findByNames(userId, names);
        return list.map(({id,name})=>(new CategoryDTO(id,name)));
    }

    async findAll(userId: number){
        const list = await this.repository.findAll(userId);
        return list.map(({id,name,tasks})=>new CategoryCountResponseDTO(id,name,tasks.length))
    }
}