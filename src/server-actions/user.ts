"use server";

import { db } from "@/db";
import authService from "@/services/authService";
import { RegisterUser } from "@/types/register";
import { Prisma, User } from "@prisma/client";
const auth = authService();

type ServerActionReturn<T> = { data: T } | { error: string | unknown };

export async function createUser(
  data: RegisterUser
): Promise<ServerActionReturn<User>> {
  try {
    const { username, email, password, verifyPassword } = data;

    if (password !== verifyPassword) return { error: "Passwords do not match" };

    const hashedPassword = auth.encryptPassword(password);

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return { data: user };
  } catch (error) {
    return { error: handleActionError(error) };
  }
}

function handleActionError(error: any): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return error.code === "P2025"
      ? "Email or username already in use"
      : `Prisma Error: ${error}`;
  }
  return String(error);
}
