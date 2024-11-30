export default class DefaultErrorResponse {
    statusCode: number;
    statusMessage?: any;
    stack?: any;
    message: string;
    data?: any;

    constructor(message: string, statusCode: number,data?: any){
        this.statusCode = statusCode;
        this.statusMessage = null;
        this.stack = null;
        this.message = message;
        this.data = data;
    }
}