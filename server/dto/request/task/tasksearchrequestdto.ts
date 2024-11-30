import { TaskStatus } from "@prisma/client";
import { z } from "zod";

export const TaskSearchRequestDTOParser = z.object({
    name: z.optional(z.nullable(z.string().trim().max(150, "can have only 150 characters"))),
    status: z.optional(z.nullable(z.nativeEnum(TaskStatus,{message: "must be 'TODO','PAUSED','DOING' or 'DONE'"}))),
    categories: z.optional(z.nullable(z.string().trim().array().or(z.string().trim().transform((val)=>[val])))),
    since: z.optional(z.nullable(z.string().date("must be a date").transform((val)=>new Date(val)))),
    until: z.optional(z.nullable(z.string().date("must be a date").transform((val)=>{let date = new Date(val); date.setMilliseconds(86399999); return date;})))
});

export type TaskSearchRequestDTO = z.infer<typeof TaskSearchRequestDTOParser>;