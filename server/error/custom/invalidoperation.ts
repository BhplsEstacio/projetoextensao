import DefaultErrorResponse from "../defaulterrorresponse";

export default class InvalidOperation extends DefaultErrorResponse{
    constructor(message: string){
        super(message,400)
    }
}