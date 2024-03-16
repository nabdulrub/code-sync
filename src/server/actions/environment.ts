"use server";

import { db } from "@/server/db";
import {
  NewEnvironmentSchema,
  RenameEnvironmentSchema,
} from "@/types/environment";
import { handleActionError } from "@/utils/handleActionError";
import { Environment, EnvironmentEditors } from "@prisma/client";
import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "../authentication";
import { DeleteSchema } from "@/types/delete";
import { UpdateByIdSchema, getByIdSchema } from "@/types/ById";

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

  const editor = await db.environmentEditors.create({
    data: {
      environmentId: environment.id,
      editorId: session.user.id,
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

export const updateEnvironmentOpenedDate = action(
  UpdateByIdSchema,
  async (data) => {
    const session = await getAuthSession();

    if (!session?.user) throw new Error("Unauthorized Request");

    const { id } = data;

    const environment = await db.environment.update({
      where: { id },
      data: {
        last_opened: new Date(),
      },
    });

    return environment;
  }
);

export type EnvironmentWithEditors = Environment & {
  editors: EnvironmentEditors[];
};

export async function getAllOwnedEnvironments(): Promise<
  EnvironmentWithEditors[] | null
> {
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
      include: {
        editors: {
          take: 4,
        },
      },
    });

    return environments;
  } catch (error) {
    return null;
  }
}

export const leaveEnvironment = action(UpdateByIdSchema, async (data) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized Request");

  const { id } = data;

  const editor = await db.environmentEditors.findFirst({
    where: {
      environmentId: id,
      editorId: session.user.id,
    },
  });

  if (!editor) throw new Error("Editor not found");

  const environment = await db.environmentEditors.delete({
    where: {
      id: editor.id,
    },
  });

  return environment;
});

export async function getAllJoinedEnvironments(): Promise<
  EnvironmentWithEditors[] | null
> {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return null;
    }

    const environments = await db.environment.findMany({
      where: {
        editors: {
          some: {
            editorId: session.user.id,
          },
        },
        NOT: {
          creatorId: session.user.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        editors: {
          take: 4,
        },
      },
    });

    return environments;
  } catch (error) {
    return null;
  }
}
