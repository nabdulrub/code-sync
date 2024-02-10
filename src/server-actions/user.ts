"use server";

import { db } from "@/db";
import authService from "@/services/authService";
import { RegisterUser } from "@/types/register";
import { ServerActionReturn } from "@/types/server-action";
import { handleActionError } from "@/utils/handleActionError";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
const auth = authService();

export async function createUser(
  data: RegisterUser
): Promise<ServerActionReturn<User>> {
  try {
    const { username, email, password, verifyPassword } = data;

    if (password !== verifyPassword)
      throw { error: "Passwords do not match", success: false };

    const hashedPassword = auth.encryptPassword(password);

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    return {
      error: "Oops something went wrong, check your credentials",
      success: false,
    };
  }
}
