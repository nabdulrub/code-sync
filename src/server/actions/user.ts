"use server";

import authService from "@/lib/authService";
import { db } from "@/server/db";
import { InviteSchema } from "@/types/invite";
import { RegisterSchema } from "@/types/register";
import { handleActionError } from "@/utils/handleActionError";
import { createSafeActionClient } from "next-safe-action";
import emailService from "../resend";
import { getAuthSession } from "../authentication";
const auth = authService();

const action = createSafeActionClient({
  handleReturnedServerError(e) {
    return handleActionError(e, "user");
  },
  handleServerErrorLog(e) {
    console.log(e);
  },
});

export const createUser = action(RegisterSchema, async (data) => {
  const { username, email, password, verifyPassword } = data;

  if (password !== verifyPassword) throw new Error("Passwords do not match");

  const hashedPassword = auth.encryptPassword(password);

  const user = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  if (!user) throw new Error("Could not register user!");
  if (user) return { success: user };
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
