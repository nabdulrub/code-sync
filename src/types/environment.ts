import { z } from "zod";

export const LANGUAGE_OPTIONS = ["javascript", "typescript"] as const;

export const NewEnvironmentSchema = z.object({
  name: z.string(),
  language: z.enum(LANGUAGE_OPTIONS),
});

export type NewEnvironment = z.infer<typeof NewEnvironmentSchema>;
