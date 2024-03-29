"use client";

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
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const NewEnvironmentModal = (props: Props) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          New Environment <Plus className="w-4 h-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new environment</DialogTitle>
          <DialogDescription>
            Get started with a new environment by giving it a name and selecting
            its compiled language.
          </DialogDescription>
        </DialogHeader>
        <NewEnvironmentForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};

export default NewEnvironmentModal;
