"use client";

import InvitetoAppForm from "@/components/forms/invite-to-app-form";
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
import { Plus, Send } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const InviteUserModal = (props: Props) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"secondary"}>
          Invite a Friend <Send className="w-4 h-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a friend</DialogTitle>
          <DialogDescription>
            Invite your friends to Code Sync!
          </DialogDescription>
        </DialogHeader>
        <InvitetoAppForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserModal;
