import CategoryService from "~/server/service/categoryservice";

export default defineEventHandler(async (event) => {
    const service = new CategoryService();
    const userId = event.context.userId;
    const list = await service.findAll(userId);
    setResponseStatus(event, 200);
    return list;
})