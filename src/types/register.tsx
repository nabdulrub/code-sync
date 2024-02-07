import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Username is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "8 Characters minimum"),
  verifyPassword: z.string(),
});

export type RegisterUser = z.infer<typeof RegisterSchema>;
