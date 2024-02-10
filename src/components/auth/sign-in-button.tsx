import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Link href={"/signin"} className="relative">
      <Button>Sign In</Button>
      <span className="flex bg-primary blur-xl -z-10 w-[75%] h-[75%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </Link>
  );
};

export default SignInButton;
