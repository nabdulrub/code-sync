import { z } from "zod";

export const InviteSchema = z.object({
  email: z.string().email("Must be a valid email!"),
});

export type Invite = z.infer<typeof InviteSchema>;

export const InviteToEnvironmentSchema = z.object({
  username: z.string(),
  environmentId: z.string(),
  creatorId: z.string(),
});

export type InviteToEnvironment = z.infer<typeof InviteToEnvironmentSchema>;

export const JoinInvitiationSchema = z.object({
  invitationId: z.string(),
  environmentId: z.string(),
});

export type JoinInvitiation = z.infer<typeof JoinInvitiationSchema>;
