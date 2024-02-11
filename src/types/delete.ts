import { z } from "zod";

export const DeleteSchema = z.object({
  id: z.string(),
});

export type Delete = z.infer<typeof DeleteSchema>;
