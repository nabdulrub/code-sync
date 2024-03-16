"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import useGetEnvironmentSession from "@/data/useGetEnvironmentSession";
import { ArrowLeftIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import InviteToEnvironmentModal from "../../actions/invite-to-environment-modal";
import EnvironmentActiveEditorsModal from "../environment-active-editors-modal";
import EnvironmentLeaveModal from "../environment-leave-modal";
import EnvironmentConnectionStatus from "../partials/environment-connection-status";

type Props = {};

const EnvironmentNavbar = (props: Props) => {
  const { data: environment } = useGetEnvironmentSession();
  const { data: session } = useSession();
  const isCreator = session?.user.id === environment?.data?.creatorId;

  if (!environment || !environment.data) return redirect("/dashboard");

  const { name, language } = environment.data;

  return (
    <div className="flex justify-between bg-secondary items-center w-full py-4 border-b-2 border-accent px-6 ">
      <Link href={"/dashboard"}>
        <Button variant={"ghost"}>
          <ArrowLeftIcon className="mr-2 w-5 h-5" /> <Title>Dashboard</Title>
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <EnvironmentConnectionStatus />
        <Title strong>{name}</Title>
        <Badge className="capitalize text-sm font-light">{language}</Badge>
      </div>
      <div className="flex items-center gap-4">
        <EnvironmentActiveEditorsModal />
        <InviteToEnvironmentModal />
        {!isCreator && <EnvironmentLeaveModal />}
      </div>
    </div>
  );
};

export default EnvironmentNavbar;
