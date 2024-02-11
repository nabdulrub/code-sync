import { Prisma } from "@prisma/client";
import { DEFAULT_SERVER_ERROR } from "next-safe-action";

export function handleActionError(error: Error, field: string): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2000":
        return `The provided ${field} is too long.`;
      case "P2001":
        return `The requested ${field} was not found.`;
      case "P2002":
        return `This ${field} already exists.`;
      case "P2003":
        return `An associated ${field} does not exist.`;
      case "P2004":
        return `An error occurred due to database constraints.`;
      case "P2005":
        return `The value '${error.meta?.value}' for ${field} is invalid.`;
      case "P2006":
        return `The provided value '${error.meta?.value}' for ${field} is invalid.`;
      case "P2007":
        return `There was an error validating the ${field} data.`;
      case "P2008":
        return `There was an error parsing the ${field} query.`;
      case "P2009":
        return `There was an error validating the ${field} query.`;
      default:
        return DEFAULT_SERVER_ERROR;
    }
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return `Oops! Something went wrong. Please try again.`;
  } else {
    return error.message;
  }
}
