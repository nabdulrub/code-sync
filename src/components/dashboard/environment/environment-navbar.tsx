import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { Environment } from "@prisma/client";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  environment: Environment;
};

const EnvironmentNavbar = ({ environment }: Props) => {
  return (
    <div className="flex justify-between bg-secondary items-center w-full py-4 border-b-2 border-accent px-6">
      <Link href={"/dashboard"}>
        <Button variant={"ghost"}>
          <ArrowLeftIcon className="mr-2 w-5 h-5" /> <Title>Dashboard</Title>
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <Title strong>{environment.name}</Title>
        <Title>/</Title>
        <Badge className="capitalize text-sm font-light">
          {environment.language}
        </Badge>
      </div>
      <Button>Invite</Button>
    </div>
  );
};

export default EnvironmentNavbar;
