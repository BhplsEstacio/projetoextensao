import { z } from "zod";

export const CategoryRequestDTOParser = z.object({
    name: z.string().trim().min(3, "name must have at least 3 characters").max(100, "name can have only 100 characters").toLowerCase()
});

export type CategoryRequestDTO = z.infer<typeof CategoryRequestDTOParser>;