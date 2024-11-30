import { TaskStatus } from "@prisma/client";
import { z } from "zod";

const ZodStatusEnum = z.nativeEnum(TaskStatus);
type StatusEnum = z.infer<typeof ZodStatusEnum>;

export default StatusEnum;