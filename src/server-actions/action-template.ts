"use server";

import { db } from "@/db";
import { ServerActionReturn } from "@/types/server-action";
import { handleActionError } from "@/utils/handleActionError";

export async function createUser(
  data: ParamsType
): Promise<ServerActionReturn<ReturnType>> {
  try {
    const {} = data;

    return { success: true };
  } catch (error) {
    return {
      error: handleActionError(error, ""),
      success: false,
    };
  }
}
