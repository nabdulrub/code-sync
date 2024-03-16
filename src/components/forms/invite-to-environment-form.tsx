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
import useGetEnvironmentSession from "@/data/useGetEnvironmentSession";
import { sendUserEnvironmentInvite } from "@/server/actions/invitiations";
import { InviteToEnvironment, InviteToEnvironmentSchema } from "@/types/invite";
import showToast from "@/utils/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

type Props = {
  closeModal: () => void;
  environmentId?: string;
  creatorId?: string;
};

const InviteToEnvironmentForm = ({
  closeModal,
  environmentId,
  creatorId,
}: Props) => {
  const { data: environment } = useGetEnvironmentSession();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<InviteToEnvironment>({
    resolver: zodResolver(InviteToEnvironmentSchema),
    defaultValues: {
      username: "",
      environmentId: environment?.data?.id
        ? environment.data.id
        : environmentId,
      creatorId: environment?.data?.creatorId
        ? environment.data.creatorId
        : creatorId,
    },
  });

  const { execute, status } = useAction(sendUserEnvironmentInvite, {
    onSuccess: (_, input) => {
      form.reset();
      closeModal();
      showToast({
        message: "Invite sent to " + input.username,
        variant: "success",
      });
    },
    onError: (error) => {
      setError(error.serverError);
      showToast({
        message: "Failed to send invite",
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: InviteToEnvironment) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} type="username" />
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

export default InviteToEnvironmentForm;
