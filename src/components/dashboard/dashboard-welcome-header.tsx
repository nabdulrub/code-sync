"use client";

import { useSession } from "next-auth/react";
import React from "react";
import DashboardActions from "./dashboard-actions";

type Props = {};

const DashboardWelcomeHeader = (props: Props) => {
  const { data: session } = useSession();
  const username = session?.user.username;

  return (
    <div className="px-8 flex items-center justify-between">
      <h2 className="text-lg ">
        Welcome back, <span className="font-semibold">{username}</span>!
      </h2>
      <DashboardActions />
    </div>
  );
};

export default DashboardWelcomeHeader;
