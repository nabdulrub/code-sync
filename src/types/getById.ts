import { z } from "zod";

export const getByIdSchema = z.object({
  id: z.string(),
});

export type getById = z.infer<typeof getByIdSchema>;
