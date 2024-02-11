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
import { createUser } from "@/server/actions/user";
import { RegisterSchema, RegisterUser } from "@/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import showToast from "@/utils/showToast";

type Props = {};

const RegisterForm = (props: Props) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<RegisterUser>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      verifyPassword: "",
    },
  });

  const { execute, status } = useAction(createUser, {
    onSuccess: async (_, input) => {
      await signIn("credentials", {
        username: input.username,
        password: input.password,
      });
      form.reset();
      showToast({
        message: "Signed in as " + input.username,
        variant: "success",
      });
    },
    onError: (error) => {
      setError(error.serverError);
      showToast({
        message: "Failed to register user",
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: RegisterUser) => {
    setError(undefined);
    execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="grid gap-2">
          <p className="font-bold text-theme-purple">Register</p>
          <h3 className="text-2xl">Create an Account</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-4 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} type="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="verifyPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verify Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {error && <p className="text-destructive font-sm mt-4">{error}</p>}
        <Button className="w-full mt-4" disabled={status === "executing"}>
          {status === "executing" ? "Getting you started..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
