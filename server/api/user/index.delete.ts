import UserService from "~/server/service/userservice";

/**
 * @openapi
 * /user:
 *   delete:
 *     tags:
 *      - User
 *     summary: User delete
 *     security:
 *          - Authorization: []
 *     description: This endpoint will delete the signed user
 *     responses:
 *       200:
 *         description: User deleted
 */
export default defineEventHandler(async (event) => {
    const userId = event.context.auth;
    const service = new UserService();
    await service.deleteUser(userId);
    setResponseStatus(event, 200);
    event.node.res.end();
})