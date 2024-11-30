import { z } from "zod";
import { UserAttributesParser } from "~/server/model/User";

export const UserCreateRequestDTOParser = UserAttributesParser.omit({id: true});

export type UserCreateRequestDTO = z.infer<typeof UserCreateRequestDTOParser>;