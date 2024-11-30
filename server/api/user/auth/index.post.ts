import { UserCredentialsRequestDTOParser } from "~/server/dto/request/user/usercredentialsrequestdto";
import FieldsError from "~/server/error/custom/fieldserror";
import UserService from "~/server/service/userservice";


/**
 * @openapi
 * /user/auth:
 *   post:
 *     tags:
 *      - User
 *     summary: User authentication
 *     description: This endpoint will return an authentication token
 *     requestBody: 
 *         required: true
 *         description: Authentication object
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserAuthDTO'
 *     responses:
 *       200:
 *         description: Token returned
 *       400:
 *         description: Wrong credentials
 *       404:
 *         description: User not found
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const result = UserCredentialsRequestDTOParser.safeParse(body);
    if(!result.success){
        throw createError<FieldsError>(new FieldsError(result.error));
    }
    const dto = result.data;
    const service = new UserService();
    const response = await service.generateAuthToken(dto);
    setResponseStatus(event, 200);
    return response;
})