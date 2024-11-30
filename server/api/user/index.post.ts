import { UserCreateRequestDTOParser } from "~/server/dto/request/user/usercreaterequestdto";
import FieldsError from "~/server/error/custom/fieldserror";
import UserService from "~/server/service/userservice";

/**
 * @openapi
 * /user:
 *   post:
 *     tags:
 *      - User
 *     summary: User register
 *     description: This endpoint will return a new user
 *     requestBody: 
 *         required: true
 *         description: User registration object
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserCreateDTO'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: User already exists
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const result = UserCreateRequestDTOParser.safeParse(body);
    if(!result.success){
        throw createError<FieldsError>(new FieldsError(result.error));
    }
    const dto = result.data;
    const service = new UserService();
    const response = await service.create(dto);
    setResponseStatus(event, 201);
    return response;
})