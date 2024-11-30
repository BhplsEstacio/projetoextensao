import { TaskUpdateRequestDTOParser } from "~/server/dto/request/task/taskupdaterequestdto";
import FieldsError from "~/server/error/custom/fieldserror";
import InvalidOperation from "~/server/error/custom/invalidoperation";
import TaskService from "~/server/service/taskservice";

/**
 * @openapi
 * /task:
 *   put:
 *     tags:
 *      - Task
 *     security:
 *          - Authorization: []
 *     summary: Update task
 *     description: This endpoint will return an updated task
 *     parameters:
 *          - name: id
 *            description: Task id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int32
 * 
 *     requestBody: 
 *         required: true
 *         description: Task updater object
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TaskUpdateDTO'
 * 
 *     responses:
 *       200:
 *         description: Task updated
 *       400:
 *         description: Task id not found/not a number
 *       404:
 *         description: Task not found
 */
export default defineEventHandler(async (event) => {
    setResponseStatus(event, 200);
    const userId = event.context.userId;

    const id = String(getRouterParam(event, 'id'));
    const taskId = parseInt(id);

    if(isNaN(taskId)){
        throw new InvalidOperation("path param 'id' must be a number");
    }

    const body = await readBody(event);

    const result = TaskUpdateRequestDTOParser.safeParse(body);
    if(!result.success){
        throw createError<FieldsError>(new FieldsError(result.error));
    }

    const dto = result.data;
    const service = new TaskService();
    const response = await service.updateTask(userId,taskId,dto);
    return response;
})