import { z } from "zod";

export const TaskWeekSearchRequestDTOParser = z.object({
    page: z.optional(z.nullable(z.string().regex(/-?\d+/g,"must be an integer number").transform((val)=>Number(val)))),
});

export type TaskWeekSearchRequestDTO = z.infer<typeof TaskWeekSearchRequestDTOParser>;