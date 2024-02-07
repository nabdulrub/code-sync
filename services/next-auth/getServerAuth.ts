import { getServerSession } from "next-auth";
import { authOptions } from ".";

export default async function getServerAuth() {
  const session = await getServerSession(authOptions);
  const authenticated = Boolean(session?.user);

  return { session, authenticated };
}
