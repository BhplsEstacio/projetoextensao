import { jwtVerify } from "jose";
import DefaultErrorResponse from "../error/defaulterrorresponse";
import UserService from "../service/userservice";

const anonymousPaths = new Map<string,string[]>();
anonymousPaths.set('POST',['/api/user/auth','/api/user'])

const publicPaths = new Map<string,string[]>();
publicPaths.set('GET',['/api/docs']);

export default defineEventHandler(async (event) => {
    const method = event.method;
    const path = event.path;
    if(path.startsWith("/api"))  {
        const token = event.headers.get('Authorization')?.replace('Bearer ', '');;

        if(anonymousPaths.get(method)?.includes(path) && token){
            throw createError( new DefaultErrorResponse('Anonymous route',403))
        }

        if(!anonymousPaths.get(method)?.includes(path) && !publicPaths.get(method)?.includes(path) && !token) {
            throw createError( new DefaultErrorResponse('Unauthorized',401))
        }

        if(token){
            try {
                const service = new UserService();
                const secret = new TextEncoder().encode(String(process.env.JWT_SECRET));
                const {userId} = (await jwtVerify(token, secret, {algorithms: ['HS256']})).payload as {userId: number};
                await service.findById(userId);
                event.context.userId = userId;
            } catch (err: unknown) {
                throw createError( new DefaultErrorResponse('Unauthorized',401))
            }
        }
    }
})