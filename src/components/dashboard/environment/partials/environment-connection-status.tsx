"use client";

import { cn } from "@/lib/utils";
import { useEnvironmentJoinStore } from "@/store/environment-join-store";
import React from "react";

type Props = {};

const EnvironmentConnectionStatus = (props: Props) => {
  const { status } = useEnvironmentJoinStore();

  return (
    <div
      className={cn("w-4 h-4 rounded-full block", {
        "bg-destructive": !status,
        "bg-green-600": status,
      })}
    />
  );
};

export default EnvironmentConnectionStatus;
