import getServerAuth from "@/server/utils/getServerAuth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

const AuthenticatedRedirect = async ({ children, redirectTo }: Props) => {
  const { session } = await getServerAuth();

  if (session?.user) {
    return redirect(redirectTo || "/dashboard");
  }

  return <>{children}</>;
};

export default AuthenticatedRedirect;
