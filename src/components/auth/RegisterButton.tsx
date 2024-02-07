import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const RegisterButton = (props: Props) => {
  return (
    <Link href={"/register"}>
      <Button className="bg-white text-black hover:bg-white/70">
        Register
      </Button>
    </Link>
  );
};

export default RegisterButton;
