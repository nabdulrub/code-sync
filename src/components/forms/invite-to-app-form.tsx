"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sendInviteEmail } from "@/server/actions/user";
import { Invite, InviteSchema } from "@/types/invite";
import showToast from "@/utils/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

type Props = {
  closeModal: () => void;
};

const InvitetoAppForm = ({ closeModal }: Props) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<Invite>({
    resolver: zodResolver(InviteSchema),
    defaultValues: {
      email: "",
    },
  });

  const { execute, status } = useAction(sendInviteEmail, {
    onSuccess: (_, input) => {
      form.reset();
      closeModal();
      showToast({
        message: "Email sent to " + input.email,
        variant: "success",
      });
    },
    onError: (error) => {
      setError(error.serverError);
      showToast({
        message: "Failed to send email",
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: Invite) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-destructive font-sm mt-4">{error}</p>}
          <Button className="w-full mt-4" disabled={status === "executing"}>
            {status === "executing" ? "Sending invite..." : "Invite"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InvitetoAppForm;
