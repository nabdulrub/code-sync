import { z } from "zod";

export const getByIdSchema = z.object({
  id: z.string(),
});

export type getById = z.infer<typeof getByIdSchema>;

export const UpdateByIdSchema = z.object({
  id: z.string(),
});

export type UpdateById = z.infer<typeof UpdateByIdSchema>;
