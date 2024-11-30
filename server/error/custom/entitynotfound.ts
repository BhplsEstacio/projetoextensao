import DefaultErrorResponse from "../defaulterrorresponse";

export default class EntityNotFound extends DefaultErrorResponse{
    constructor(entity: string){
        super(`${entity} Not Found`,404)
    }
}