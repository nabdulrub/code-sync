import { z } from "zod";

export const LANGUAGE_OPTIONS = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "php",
] as const;

export type LanguageOptions =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "csharp"
  | "php";

export const NewEnvironmentSchema = z.object({
  name: z.string(),
  language: z.enum(LANGUAGE_OPTIONS),
});

export type NewEnvironment = z.infer<typeof NewEnvironmentSchema>;

export const RenameEnvironmentSchema = z.object({
  name: z.string(),
  id: z.string(),
});

export type RenameEnvironment = z.infer<typeof RenameEnvironmentSchema>;
