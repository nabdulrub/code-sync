import { SignInUser, SigninSchema } from "@/types/SignInUser";
import bcrypt from "bcrypt";
import { db } from "../../../../prisma";
import { RequestInternal } from "next-auth";

export default async function signInUserCredentials(
  credentials: any,
  req: Pick<RequestInternal, "body" | "method" | "query" | "headers">
) {
  const { email, password } = SigninSchema.parse(credentials);

  if (!credentials || !email || !password) return null;

  try {
    const verifyUser = await db.user.findFirst({
      where: { email },
    });

    if (!verifyUser) {
      return null;
    }

    const hashedPassword = verifyUser.password || "";

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    console.log(isPasswordCorrect);

    if (isPasswordCorrect) {
      return {
        id: verifyUser.id,
        email: verifyUser.email,
        name: verifyUser.name,
        phone: verifyUser.phoneNumber,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}
