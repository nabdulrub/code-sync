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
import { RegisterSchema, RegisterUser } from "@/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "@/server-actions/user";
import { Input } from "../ui/input";
import { serverActionHandler } from "@/utils/serverActionHandler";
import { useRouter } from "next/navigation";
import {
  LANGUAGE_OPTIONS as languageOptions,
  NewEnvironment,
  NewEnvironmentSchema,
} from "@/types/environment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createEnvironment } from "@/server-actions/environment";
import { useEnvironmentListContext } from "@/context/EnvironmentListProvider";

type Props = {
  closeModal: () => void;
};

const NewEnvironmentForm = ({ closeModal }: Props) => {
  const { refetch } = useEnvironmentListContext();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const form = useForm<NewEnvironment>({
    resolver: zodResolver(NewEnvironmentSchema),
    defaultValues: {
      name: "",
      language: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: NewEnvironment) => {
    await serverActionHandler({
      preAction: () => setError(undefined),
      serverAction: () => createEnvironment(data),
      onSuccess: () => {
        reset();
        closeModal();
        refetch();
      },
      onFail: (error) => setError(error),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
        <div className="grid md:grid-cols-2 gap-8 mt-4 ">
          <FormField
            control={control}
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
            control={control}
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
        <Button className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Creating Enviornment..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default NewEnvironmentForm;
