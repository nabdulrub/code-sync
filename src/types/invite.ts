import { z } from "zod";

export const InviteSchema = z.object({
  email: z.string().email("Must be a valid email!"),
});

export type Invite = z.infer<typeof InviteSchema>;
