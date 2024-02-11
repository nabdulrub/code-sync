import authService from "@/lib/authService";
import { signInUser } from "@/server/actions/auth";

const auth = authService();

export default async function signInUserCredentials(credentials: any) {
  const user = await signInUser(credentials);
  if (user.validationErrors) return null;
  if (user.serverError) return null;
  return user.data;
}
