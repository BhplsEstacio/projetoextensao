import { TaskSearchRequestDTOParser } from "~/server/dto/request/task/tasksearchrequestdto";
import FieldsError from "~/server/error/custom/fieldserror";
import TaskService from "~/server/service/taskservice";

/**
 * @openapi
 * /task:
 *   get:
 *     tags:
 *      - Task
 *     security:
 *          - Authorization: []
 *     summary: List all tasks
 *     description: This endpoint will return a list of tasks
 *     parameters:
 *          - name: name
 *            description: Search tasks with character
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 * 
 *          - name: status
 *            description: Search tasks with status
 *            in: query
 *            required: false
 *            schema:
 *              enum: 
 *                  - TODO
 *                  - PAUSED
 *                  - DOING
 *                  - DONE
 * 
 *          - name: categories
 *            description: Search tasks with categories
 *            in: query
 *            required: false
 *            schema:
 *              type: array
 *              items:
 *                  type: string
 *
 *          - name: since
 *            description: Search tasks with deadline since date
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *              format: date
 *              pattern: ^[0-9]{4}-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])$
 * 
 *          - name: until
 *            description: Search tasks with deadline until date
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *              format: date
 *              pattern: ^[0-9]{4}-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])$
 * 
 *     responses:
 *       200:
 *         description: Task list
 */
export default defineEventHandler(async (event) => {
    setResponseStatus(event, 200);
    const userId = event.context.userId;
    const query = getQuery(event);
    const result = TaskSearchRequestDTOParser.safeParse(query);
    if(!result.success){
        throw createError<FieldsError>(new FieldsError(result.error));
    }
    const search = result.data;
    const service = new TaskService();
    const response = await service.findAll(userId,search);
    return response;
})