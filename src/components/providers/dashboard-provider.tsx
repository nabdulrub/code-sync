"use client";

import { EnvironmentListProvider } from "@/context/EnvironmentListProvider";
import React from "react";

type Props = {};

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  return <EnvironmentListProvider>{children}</EnvironmentListProvider>;
};

export default DashboardProvider;
