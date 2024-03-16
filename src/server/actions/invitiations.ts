"use server";

import authService from "@/lib/authService";
import { db } from "@/server/db";
import {
  InviteSchema,
  InviteToEnvironmentSchema,
  JoinInvitiationSchema,
} from "@/types/invite";
import { handleActionError } from "@/utils/handleActionError";
import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "../authentication";
import emailService from "../resend";
import { Environment, EnvironmentInvitations } from "@prisma/client";
const auth = authService();

const action = createSafeActionClient({
  handleReturnedServerError(e) {
    return handleActionError(e, "user");
  },
  handleServerErrorLog(e) {
    console.log(e);
  },
});

export const sendInviteEmail = action(InviteSchema, async (data) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized Request");

  const { email } = data;

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (user) throw new Error("User already registered");

  await emailService.send({
    from: "codesync-no-reply@wireflow.us",
    to: email,
    subject: `Invited to Code Sync by ${session.user.username}`,
    html: `<body> 
              <p>You have been invited to join Code Sync by ${session.user.username}</p>
              <p>join using the following link: <a href=${process.env.HOST}>Code Sync</a></p>
             </body>`,
  });

  if (user) return { success: user };
});

export const sendUserEnvironmentInvite = action(
  InviteToEnvironmentSchema,
  async (data) => {
    const session = await getAuthSession();

    if (!session?.user) throw new Error("Unauthorized Request");

    const { username, environmentId, creatorId } = data;

    const environment = await db.environmentEditors.findFirst({
      where: {
        environmentId,
        editor: {
          username: username,
        },
      },
    });

    if (environment) throw new Error("User already an editor!");

    const user = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) throw new Error("User not registered on Code Sync");

    if (creatorId === user.id)
      throw new Error("Cannot invite owner of the project!");

    await emailService.send({
      from: "codesync-no-reply@wireflow.us",
      to: user?.email,
      subject: `You have been invited to a coding environment by ${session.user.username}`,
      html: `<body> 
              <p>You have been invited to join a coding environment by ${session.user.username}</p>
              <p>Check your invitiations by logging in: <a href=${process.env.HOST}>Sign In to Code Sync</a></p>
             </body>`,
    });

    const invitiation = await db.environmentInvitations.create({
      data: {
        environmentId,
        inviteeId: user.id,
      },
    });

    if (user) return { success: invitiation };
  }
);

export const joinInvitiation = action(JoinInvitiationSchema, async (data) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized Request");

  const { invitationId, environmentId } = data;

  const updatedEnvironment = await db.environmentEditors.create({
    data: {
      editorId: session.user.id,
      environmentId,
    },
  });

  if (!updatedEnvironment) throw new Error("Failed to join invite!");

  const invitation = await db.environmentInvitations.update({
    where: {
      id: invitationId,
    },
    data: {
      joined: true,
    },
  });

  if (!invitation) throw new Error("Failed to join invite!");

  if (invitation) return { success: true };
});

export type InvitiationsWithEnvironment = EnvironmentInvitations & {
  environment: Environment;
};

export async function getAllUserIncomingInvitiations(): Promise<
  InvitiationsWithEnvironment[] | null
> {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return null;
    }

    const environments = await db.environmentInvitations.findMany({
      where: {
        inviteeId: session.user.id,
        joined: false,
      },
      include: {
        environment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return environments;
  } catch (error) {
    return null;
  }
}
