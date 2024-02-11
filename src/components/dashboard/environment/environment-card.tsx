"use client";

import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Title from "@/components/ui/title";
import { useGetOwnedEnvironments } from "@/data/useGetOwedEnvironments";
import { cn } from "@/lib/utils";
import { deleteEnvironment } from "@/server/actions/environment";
import showToast from "@/utils/showToast";
import { Environment } from "@prisma/client";
import { EyeIcon, EyeOff } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import EnvironmentCardOptions from "./environment-card-options";
import { useRouter } from "next/navigation";

type EnvironmentCardProps = {
  environment: Environment;
};

const EnvironmentCard = ({ environment }: EnvironmentCardProps) => {
  const { refetch } = useGetOwnedEnvironments();
  const { name, language, last_opened } = environment;
  const router = useRouter();

  const { status, execute } = useAction(deleteEnvironment, {
    onSuccess: () => {
      showToast({
        message: "Environment deleted!",
        variant: "success",
      });
      refetch();
    },
    onError: () => {
      showToast({
        message: "Failed to delete environment",
        variant: "error",
      });
    },
  });

  return (
    <div className="relative">
      <Card
        className={cn(
          "bg-primary md:max-w-[450px] rounded-lg relative pt-8 border-2 border-white cursor-pointer",
          { "blur-[5px]": status === "executing" }
        )}
      >
        <CardContent
          className="grid gap-2 "
          onClick={() =>
            router.push(`/dashboard/environment/${environment.id}`)
          }
        >
          <Title size="xs" className="font-medium">
            {name}
          </Title>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Badge variant={"secondary"} className="flex gap-2 items-center">
                {last_opened ? last_opened.toLocaleDateString() : "Unopened"}
                {last_opened ? (
                  <EyeIcon className="w-4 h-4 " />
                ) : (
                  <EyeOff className="w-4 h-4 " />
                )}
              </Badge>
            </div>
            <Badge variant={"secondary"} className="capitalize">
              {language}
            </Badge>
          </div>
        </CardContent>
        <EnvironmentCardOptions
          deleteRecord={execute}
          environment={environment}
          status={status}
        />
      </Card>
      <Loader show={status === "executing"} />
    </div>
  );
};

export default EnvironmentCard;
