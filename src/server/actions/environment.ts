"use server";

import { db } from "@/server/db";
import {
  NewEnvironmentSchema,
  RenameEnvironmentSchema,
} from "@/types/environment";
import { handleActionError } from "@/utils/handleActionError";
import { Environment } from "@prisma/client";
import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "../authentication";
import { DeleteSchema } from "@/types/delete";
import { getByIdSchema } from "@/types/getById";

const action = createSafeActionClient({
  handleReturnedServerError(e) {
    return handleActionError(e, "environment");
  },
  handleServerErrorLog(e) {
    console.log(e);
  },
});

export const createEnvironment = action(NewEnvironmentSchema, async (data) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized Request");

  const { name, language } = data;

  const environment = await db.environment.create({
    data: {
      name,
      language,
      creatorId: session.user.id,
    },
  });

  return environment;
});

export const deleteEnvironment = action(DeleteSchema, async (data) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized Request");

  const { id } = data;

  const environment = await db.environment.delete({
    where: {
      id,
    },
  });

  return { success: true };
});

export const renameEnvironment = action(
  RenameEnvironmentSchema,
  async (data) => {
    const session = await getAuthSession();

    if (!session?.user) throw new Error("Unauthorized Request");

    const { name, id } = data;

    const environment = await db.environment.update({
      where: { id },
      data: { name },
    });

    return { success: true };
  }
);

export const getEnvironmentById = action(getByIdSchema, async (data) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized Request");

  const { id } = data;

  const environment = await db.environment.findFirst({
    where: { id },
  });

  return environment;
});

export async function getAllOwnedEnvironments(): Promise<Environment[] | null> {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return null;
    }

    const environments = await db.environment.findMany({
      where: {
        creatorId: session.user.id,
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
