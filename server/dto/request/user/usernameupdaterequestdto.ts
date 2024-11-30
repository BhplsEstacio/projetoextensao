import { z } from "zod";
import { UserAttributesParser } from "~/server/model/User";

export const UserNameUpdateRequestDTOParser = UserAttributesParser.pick({name: true});

export type UserNameUpdateRequestDTO = z.infer<typeof UserNameUpdateRequestDTOParser>;