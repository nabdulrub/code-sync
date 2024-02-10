import protectServerPage from "@/services/next-auth/protectServerPage";
import React from "react";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

const ProtectedPage = async ({ children, redirectTo = "/" }: Props) => {
  const session = await protectServerPage({ redirectTo });

  return <>{children}</>;
};

export default ProtectedPage;
