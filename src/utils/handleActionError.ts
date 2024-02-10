import { Prisma } from "@prisma/client";

export function handleActionError(error: any, field?: string): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(error);
    return error.code === "P2025"
      ? `${field} already in use`
      : `Prisma Error: ${error}`;
  }
  return error.error;
}
