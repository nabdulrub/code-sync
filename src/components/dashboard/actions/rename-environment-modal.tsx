"use client";

import NewEnvironmentForm from "@/components/forms/new-environment-form";
import RenameEnvironmentForm from "@/components/forms/rename-environment-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  name: string;
  id: string;
};

const RenameEnvironmentModal = ({ name, id }: Props) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button
          className="pl-2 rounded-sm w-full justify-start"
          variant={"ghost"}
        >
          Rename
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Rename <span className="font-bold">{name}</span>
          </DialogTitle>
        </DialogHeader>
        <RenameEnvironmentForm closeModal={closeModal} id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default RenameEnvironmentModal;
