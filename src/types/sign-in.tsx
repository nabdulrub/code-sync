import { z } from "zod";

export const SigninSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignInUser = z.infer<typeof SigninSchema>;
