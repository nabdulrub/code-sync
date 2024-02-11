"use client";

import { HookActionStatus } from "next-safe-action/hooks";
import { HTMLAttributes } from "react";

interface DeleteButtonProps extends HTMLAttributes<HTMLButtonElement> {
  status: HookActionStatus;
}

const EnvironmentDeleteButton = ({ onClick, status }: DeleteButtonProps) => {
  return (
    <button onClick={onClick} disabled={status === "executing"}>
      Delete
    </button>
  );
};

export default EnvironmentDeleteButton;
