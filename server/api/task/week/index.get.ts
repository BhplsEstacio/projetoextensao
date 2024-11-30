import { TaskWeekSearchRequestDTOParser } from "~/server/dto/request/task/taskweeksearchrequestdto";
import FieldsError from "~/server/error/custom/fieldserror";
import TaskService from "~/server/service/taskservice";

/**
 * @openapi
 * /task/week:
 *   get:
 *     tags:
 *      - Task
 *     security:
 *          - Authorization: []
 *     summary: List tasks by week
 *     description: This endpoint will return a list of tasks in one week
 *     parameters:
 *          - name: page
 *            description: Week page
 *            in: query
 *            required: false
 *            schema:
 *              type: integer
 *              format: int32
 * 
 *     responses:
 *       200:
 *         description: Task list
 */
export default defineEventHandler(async (event) => {
    setResponseStatus(event, 200);
    const userId = event.context.userId;
    const query = getQuery(event);
    const result = TaskWeekSearchRequestDTOParser.safeParse(query);
    if(!result.success){
        throw createError<FieldsError>(new FieldsError(result.error));
    }
    const search = result.data;
    const service = new TaskService();
    const response = await service.findByWeek(userId,search);
    return response;
})