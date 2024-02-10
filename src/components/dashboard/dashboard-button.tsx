import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const DashboardButton = (props: Props) => {
  return (
    <Link href={"/dashboard"}>
      <Button className="bg-white text-black hover:bg-white/70">
        Dashboard
      </Button>
    </Link>
  );
};

export default DashboardButton;
