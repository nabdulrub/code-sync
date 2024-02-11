import protectServerPage from "@/server/utils/protectServerPage";
import React from "react";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

const ProtectedPage = async ({ children, redirectTo = "/" }: Props) => {
  // Protected page function
  await protectServerPage({ redirectTo });

  return <>{children}</>;
};

export default ProtectedPage;
