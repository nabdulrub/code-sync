"use client";

import InvitetoAppForm from "@/components/forms/invite-to-app-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";

type Props = {
  option?: boolean;
};

const InviteUserModal = ({ option }: Props) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full flex justify-start">
        <Button
          variant={option ? "ghost" : "secondary"}
          className={cn("w-fit", {
            "pl-2 rounded-sm w-full justify-start": option,
          })}
        >
          Invite a Friend {!option && <Send className="w-4 h-4 ml-1" />}
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
