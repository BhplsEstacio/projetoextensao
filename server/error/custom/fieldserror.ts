import { ZodError, ZodIssue } from "zod";
import DefaultErrorResponse from "../defaulterrorresponse";

export default class FieldsError extends DefaultErrorResponse {
    
    constructor(error: ZodError) {
        super('Object fields error',400);
        const noFieldsError = error.issues.find(({path})=> path.join('.') === '');
        if(noFieldsError){
            this.message = `Object fields error. ${noFieldsError.message}`;
        } else {
            this.data = {fields: this.formatZodError(error)};
        }
    }

    formatZodIssue(issue: ZodIssue) {
        const { path, message } = issue;
        const pathString = path.join('.')

        return { pathString, message };
    }

    formatZodError(error: ZodError) {
        const { issues } = error;
        const fieldsMap = new Map<string, string[]>();
        issues.forEach(issue => {
            const { pathString, message } = this.formatZodIssue(issue);
            if (!fieldsMap.has(pathString)) {
                fieldsMap.set(pathString, []);
            }
            fieldsMap.get(pathString)?.push(message);
        });
        return Object.fromEntries(fieldsMap.entries());
    }
}