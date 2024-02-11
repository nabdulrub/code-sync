import { Session, getServerSession } from "next-auth";
import { authOptions } from "../authentication";

export default async function getServerAuth(): Promise<{
  session: Session;
  authenticated: boolean;
}> {
  const session = await getServerSession(authOptions);
  const authenticated = Boolean(session?.user);

  return { session, authenticated };
}
