"use server";

import authService from "@/lib/authService";
import { db } from "@/server/db";
import { RegisterSchema } from "@/types/register";
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
