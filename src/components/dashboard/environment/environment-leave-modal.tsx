"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetEnvironmentSession from "@/data/useGetEnvironmentSession";
import { useGetJoinedEnvironments } from "@/data/useGetJoinedEnvironments";
import { leaveEnvironment } from "@/server/actions/environment";
import showToast from "@/utils/showToast";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

const EnvironmentLeaveModal = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { data: environment } = useGetEnvironmentSession();
  const { refetch: updateJoinedEnvironments } = useGetJoinedEnvironments();
  const router = useRouter();

  const { execute, status } = useAction(leaveEnvironment, {
    onSuccess: async () => {
      await updateJoinedEnvironments();
      router.replace("/dashboard");
      showToast({
        message: `You've left ${environment?.data?.name}`,
        variant: "success",
      });
    },

    onError: () => {
      showToast({
        message: `Failed to leave ${environment?.data?.name}`,
        variant: "error",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full flex justify-start">
        <Button variant={"destructive"}>Leave</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to leave{" "}
            <span className="font-bold underline">
              {environment?.data?.name ?? "?"}
            </span>
          </DialogTitle>
          <DialogDescription>
            You can only join this environment back if you are invited by the
            owner again! are you sure you want to leave?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            disabled={status === "executing"}
            onClick={() =>
              execute({ id: environment?.data?.id ? environment.data.id : "" })
            }
          >
            {status === "executing" ? "Leaving..." : "Yes, Leave"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnvironmentLeaveModal;
