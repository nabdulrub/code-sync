"use server";

import authService from "@/lib/authService";
import { db } from "@/server/db";
import { SigninSchema } from "@/types/sign-in";
import { handleActionError } from "@/utils/handleActionError";
import { createSafeActionClient } from "next-safe-action";
const auth = authService();

const action = createSafeActionClient({
  handleReturnedServerError(e) {
    return handleActionError(e, "user");
  },
  handleServerErrorLog(e) {
    console.log(e);
  },
});

export const signInUser = action(SigninSchema, async (data) => {
  const { username, password } = data;

  const verifyUser = await db.user.findFirst({
    where: { username },
  });

  if (!verifyUser) {
    return null;
  }

  const isPasswordCorrect = auth.comparePassword(password, verifyUser.password);

  if (isPasswordCorrect) {
    return {
      id: verifyUser.id,
      email: verifyUser.email,
      username: verifyUser.username,
    };
  }

  return null;
});
