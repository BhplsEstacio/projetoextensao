import { z } from "zod";

export const UserCredentialsRequestDTOParser = z.object({
    credential: z.string().trim().min(5, "credential must have at least 6 characters").max(255, "credential can have only 255 characters"),
    password: z.string().trim().min(8, "password must have at least 8 characters").max(24, "password can have only 24 characters")
});

export type UserCredentialsRequestDTO = z.infer<typeof UserCredentialsRequestDTOParser>;