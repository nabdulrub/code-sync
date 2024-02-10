import { db } from "@/db";
import authService from "@/services/authService";
import { SigninSchema } from "@/types/sign-in";
import { RequestInternal } from "next-auth";

const auth = authService();

export default async function signInUserCredentials(credentials: any) {
  const { username, password } = SigninSchema.parse(credentials);

  if (!credentials || !password) return null;

  try {
    const verifyUser = await db.user.findFirst({
      where: { username },
    });

    if (!verifyUser) {
      return null;
    }

    const hashedPassword = verifyUser.password || "";

    const isPasswordCorrect = auth.comparePassword(password, hashedPassword);

    if (isPasswordCorrect) {
      return {
        id: verifyUser.id,
        email: verifyUser.email,
        username: verifyUser.username,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}
