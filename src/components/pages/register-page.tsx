import React from "react";
import Logo from "../brand/logo";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import RegisterForm from "../forms/register-form";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div className="min-h-screen flex md:justify-center md:items-center px-6">
      <div className="flex flex-col gap-10 sm:justify-start mt-24 md:mt-0 md:items-center w-full">
        <Logo size="2xl" />
        <div className="mx-auto w-full max-w-[800px] md:bg-secondary md:shadow-primary/15 md:shadow-[0px_0px_75px_10px] md:p-16 rounded-2xl">
          <Link href={"/"}>
            <div className="-ml-2 mb-4 flex gap-1 text-theme-purple">
              <ChevronLeft className="w-5 h-5" />
              <p className="font-medium text-sm">Back to Home</p>
            </div>
          </Link>
          <RegisterForm />
        </div>
        <p>
          Already signed up?
          <Link href="/signin" className="text-blue-400 font-semibold ml-2">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
