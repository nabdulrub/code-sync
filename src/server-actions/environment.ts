"use server";

import { db } from "@/db";
import { Environment } from "@prisma/client";
import { NewEnvironment } from "@/types/environment";
import { ServerActionReturn } from "@/types/server-action";
import { handleActionError } from "@/utils/handleActionError";
import getServerAuth from "@/services/next-auth/getServerAuth";
import { getAuthSession } from "@/services/next-auth";

export async function createEnvironment(
  data: NewEnvironment
): Promise<ServerActionReturn<Environment>> {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return { error: "Unauthorized Request", success: false };
    }

    const { name, language } = data;

    const environment = await db.environment.create({
      data: {
        name,
        language,
        creatorId: session.user.id,
      },
    });

    return { success: true, data: environment };
  } catch (error) {
    return {
      error: "Oops something went wrong",
      success: false,
    };
  }
}

export async function getAllOwnedEnvironments(): Promise<
  ServerActionReturn<Environment[]>
> {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return { error: "Unauthorized Request", success: false };
    }

    const environments = await db.environment.findMany({
      where: {
        creatorId: session.user.id,
      },
    });

    return { success: true, data: environments };
  } catch (error) {
    return {
      error: "Oops something went wrong",
      success: false,
    };
  }
}
