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
import { SignInUser, SigninSchema } from "@/types/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../brand/logo";
import { Input } from "../ui/input";
import showToast from "@/utils/showToast";

type Props = {};

const SignInForm = (props: Props) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const form = useForm<SignInUser>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SignInUser) => {
    try {
      setError(undefined);
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        reset();
        router.push("/dashboard");
        showToast({
          message: "Signed in as " + data.username,
          variant: "success",
        });
      }

      if (!result?.ok) {
        setError("Wrong username or password!");
      }
    } catch (error) {
      setError("Something went wrong");
      showToast({
        message: "Failed to sign in user",
        variant: "error",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
        <div className="grid gap-2">
          <p className="font-bold text-theme-purple">Sign In</p>
          <h3 className="text-2xl flex items-end flex-wrap">
            Welcome back to <Logo size="md" className="sm:ml-1.5" />
          </h3>
        </div>
        <div className="grid gap-6 mt-4 ">
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
        </div>
        {error && <p className="text-destructive font-sm mt-4">{error}</p>}
        <Button className="w-full mt-6" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
