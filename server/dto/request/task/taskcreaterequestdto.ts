import { TaskStatus } from "@prisma/client";
import { z } from "zod";
import { CategoryRequestDTOParser } from "../category/categoryrequestdto";
import TaskWithCategoriesAbstractDTO from "./taskwithcategoriesabstractdto";

export const TaskCreateRequestDTOParser = z.object({
    name: z.string().trim().min(3, "must have at least 3 characters").max(150, "can have only 150 characters"),
    description: z.optional(z.nullable(z.string().trim().min(3, "must have at least 3 characters").max(255, "can have only 255 characters"))),
    deadline: z.optional(z.nullable(z.coerce.date({required_error: "select a date and time",invalid_type_error: "that's not a date"}))),
    status: z.optional(z.nullable(z.nativeEnum(TaskStatus,{message: "must be 'TODO','PAUSED','DOING' or 'DONE'"}))),
    categories: z.optional(z.nullable(CategoryRequestDTOParser.array()))
});

export type TaskCreateRequestDTO = z.infer<typeof TaskCreateRequestDTOParser> & TaskWithCategoriesAbstractDTO;