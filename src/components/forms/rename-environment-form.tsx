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
import { useGetOwnedEnvironments } from "@/data/useGetOwedEnvironments";
import { renameEnvironment } from "@/server/actions/environment";
import {
  RenameEnvironment,
  RenameEnvironmentSchema,
} from "@/types/environment";
import showToast from "@/utils/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

type Props = {
  closeModal: () => void;
  id: string;
};

const RenameEnvironmentForm = ({ closeModal, id }: Props) => {
  const { refetch } = useGetOwnedEnvironments();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<RenameEnvironment>({
    resolver: zodResolver(RenameEnvironmentSchema),
    defaultValues: {
      name: "",
      id,
    },
  });

  const { execute, status } = useAction(renameEnvironment, {
    onSuccess: () => {
      form.reset();
      closeModal();
      refetch();
      showToast({
        message: "Renamed environment successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      setError(error.serverError);
      showToast({
        message: "Failed to rename environment",
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: RenameEnvironment) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>New Name</FormLabel>
                <FormControl>
                  <Input {...field} type="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-destructive font-sm mt-4">{error}</p>}
          <Button className="w-full mt-4" disabled={status === "executing"}>
            {status === "executing" ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RenameEnvironmentForm;
