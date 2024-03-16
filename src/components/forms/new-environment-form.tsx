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
import { useGetOwnedEnvironments } from "@/data/useGetOwnedEnvironments";
import { createEnvironment } from "@/server/actions/environment";
import {
  NewEnvironment,
  NewEnvironmentSchema,
  LANGUAGE_OPTIONS as languageOptions,
} from "@/types/environment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import showToast from "@/utils/showToast";

type Props = {
  closeModal: () => void;
};

const NewEnvironmentForm = ({ closeModal }: Props) => {
  const { refetch } = useGetOwnedEnvironments();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<NewEnvironment>({
    resolver: zodResolver(NewEnvironmentSchema),
    defaultValues: {
      name: "",
      language: undefined,
    },
  });

  const { execute, status } = useAction(createEnvironment, {
    onSuccess: () => {
      form.reset();
      closeModal();
      refetch();
      showToast({
        message: "Created environment successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      setError(error.serverError);
      showToast({
        message: "Failed to create environment",
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: NewEnvironment) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="grid md:grid-cols-2 gap-8 mt-4 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((language, index) => (
                        <SelectItem
                          key={index}
                          className="capitalize"
                          value={language}
                        >
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {error && <p className="text-destructive font-sm mt-4">{error}</p>}
        <Button className="w-full mt-4" disabled={status === "executing"}>
          {status === "executing" ? "Creating Enviornment..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default NewEnvironmentForm;
