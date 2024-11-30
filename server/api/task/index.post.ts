import { TaskCreateRequestDTOParser } from "~/server/dto/request/task/taskcreaterequestdto";
import FieldsError from "~/server/error/custom/fieldserror";
import TaskService from "~/server/service/taskservice";

/**
 * @openapi
 * /task:
 *   post:
 *     tags:
 *      - Task
 *     security:
 *          - Authorization: []
 *     summary: Create task
 *     description: This endpoint will return a new task
 *     requestBody: 
 *         required: true
 *         description: Task creator object
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TaskCreateDTO'
 * 
 *     responses:
 *       201:
 *         description: Task created
 */
export default defineEventHandler(async (event) => {
    setResponseStatus(event, 201);
    const userId = event.context.userId;
    const body = await readBody(event);
    const result = TaskCreateRequestDTOParser.safeParse(body);
    if(!result.success){
        throw createError<FieldsError>(new FieldsError(result.error));
    }
    const dto = result.data;
    const service = new TaskService();
    const response = await service.create(userId,dto);
    return response;
})