import getServerAuth from "./getServerAuth";
import { redirect } from "next/navigation";

type ProtectedPageOptions = {
  redirectTo?: string;
};

export default async function protectServerPage(options: ProtectedPageOptions) {
  const { redirectTo = "/" } = options;

  const { authenticated, session } = await getServerAuth();

  if (!authenticated) return redirect(redirectTo);

  return { authenticated, session };
}
