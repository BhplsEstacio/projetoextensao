import InvalidOperation from "~/server/error/custom/invalidoperation";
import TaskService from "~/server/service/taskservice";

/**
 * @openapi
 * /task/{id}:
 *   delete:
 *     tags:
 *      - Task
 *     security:
 *          - Authorization: []
 *     summary: Delete task
 *     description: This endpoint will delete a task
 *     parameters:
 *          - name: id
 *            description: Task id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *              format: int32
 * 
 *     responses:
 *       200:
 *         description: Task deleted
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

    const service = new TaskService();
    const response = await service.delete(userId,taskId);
    return response;
})