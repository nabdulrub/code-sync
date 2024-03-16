"use client";

import InvitetoAppForm from "@/components/forms/invite-to-app-form";
import InviteToEnvironmentForm from "@/components/forms/invite-to-environment-form";
import NewEnvironmentForm from "@/components/forms/new-environment-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetEnvironmentSession from "@/data/useGetEnvironmentSession";
import { cn } from "@/lib/utils";
import { Plus, Send } from "lucide-react";
import React, { useState } from "react";

type Props = {
  option?: boolean;
  environmentId?: string;
  creatorId?: string;
};

const InviteToEnvironmentModal = ({
  option,
  environmentId,
  creatorId,
}: Props) => {
  const { data: environment } = useGetEnvironmentSession();
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn({ "w-full": option })}>
        <Button
          variant={option ? "ghost" : "default"}
          className={cn("w-fit", {
            "pl-2 rounded-sm w-full justify-start": option,
          })}
        >
          Invite {!option && <Send className="w-4 h-4 ml-1" />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Invite an editor to {environment?.data?.name || "environment"}
          </DialogTitle>
          <DialogDescription>
            Invite your friends to start collaborating and learning together!
          </DialogDescription>
        </DialogHeader>
        <InviteToEnvironmentForm
          closeModal={closeModal}
          environmentId={environmentId}
          creatorId={creatorId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InviteToEnvironmentModal;
