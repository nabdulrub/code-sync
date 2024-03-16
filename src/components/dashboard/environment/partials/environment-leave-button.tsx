"use client";

import { Button } from "@/components/ui/button";
import { HookActionStatus } from "next-safe-action/hooks";
import { HTMLAttributes } from "react";

interface DeleteButtonProps extends HTMLAttributes<HTMLButtonElement> {
  status: HookActionStatus;
}

const EnvironmentLeaveButton = ({ onClick, status }: DeleteButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={status === "executing"}
      className="pl-2 rounded-sm w-full justify-start"
      variant={"destructive"}
    >
      Leave
    </Button>
  );
};

export default EnvironmentLeaveButton;
