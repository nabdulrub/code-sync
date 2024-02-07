"use client";

import { RegisterUser, RegisterSchema } from "@/types/register";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";
import { Input } from "../ui/input";
import { createUser } from "@/server-actions/user";

type Props = {
  email?: string;
};

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

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: RegisterUser) => {
    setError(undefined);
    if (data.password !== data.verifyPassword)
      return setError("Passwords do not match");

    const result = await createUser(data);

    console.log(result);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
        <div className="grid gap-2">
          <p className="font-bold text-theme-purple">Register</p>
          <h3 className="text-2xl">Create an Account</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-4 ">
          <FormField
            control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
        <Button className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Getting you started..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
