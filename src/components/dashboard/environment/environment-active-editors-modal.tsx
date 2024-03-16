"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEnvironmentJoinStore } from "@/store/environment-join-store";
import { useState } from "react";
import EnvironmentNavbarActiveEditors from "./navbar/environment-navbar-active-editors";

type Props = {};

const EnvironmentActiveEditorsModal = (props: Props) => {
  const { activeEditors } = useEnvironmentJoinStore();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full flex justify-start">
        <EnvironmentNavbarActiveEditors />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Active Editors</DialogTitle>
        </DialogHeader>
        {activeEditors.map((editor) => (
          <Card key={editor.editorId} style={{ backgroundColor: editor.color }}>
            <CardContent className="p-3 px-5">
              <p className="font-bold">{editor.username}</p>
            </CardContent>
          </Card>
        ))}
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnvironmentActiveEditorsModal;
