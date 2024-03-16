"use client";

import Loader from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import Title from "@/components/ui/title";
import { useGetJoinedEnvironments } from "@/data/useGetJoinedEnvironments";
import { useGetOwnedEnvironments } from "@/data/useGetOwnedEnvironments";
import { cn } from "@/lib/utils";
import {
  EnvironmentWithEditors,
  deleteEnvironment as deleteEnvironmentAction,
  leaveEnvironment as leaveEnvironmentAction,
  updateEnvironmentOpenedDate,
} from "@/server/actions/environment";
import { LanguageOptions } from "@/types/environment";
import showToast from "@/utils/showToast";
import { VariantProps, cva } from "class-variance-authority";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import EnvironmentCardEditors from "./environment-card-editors";
import EnvironmentCardOptions from "./environment-card-options";
import EnvironmentLanguageBadge from "./partials/environment-language-badge";
import EnvironmentOpenedBadge from "./partials/environment-opened-badge";

const cardVariants = cva(
  "md:max-w-[450px] rounded-lg relative pt-8 border-2 border-white cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type EnvironmentCardProps = VariantProps<typeof cardVariants> & {
  environment: EnvironmentWithEditors;
};
const EnvironmentCard = ({ environment, variant }: EnvironmentCardProps) => {
  const { refetch: updateOwnedEnvironments } = useGetOwnedEnvironments();
  const { refetch: updateJoinedEnvironments } = useGetJoinedEnvironments();
  const router = useRouter();

  const { name, language, last_opened } = environment;

  const deleteEnvironment = useAction(deleteEnvironmentAction, {
    onSuccess: async () => {
      await updateOwnedEnvironments();
      showToast({
        message: "Environment deleted!",
        variant: "success",
      });
    },
    onError: () => {
      showToast({
        message: "Failed to delete environment",
        variant: "error",
      });
    },
  });

  const leaveEnvironment = useAction(leaveEnvironmentAction, {
    onSuccess: async () => {
      await updateJoinedEnvironments();
      showToast({
        message: "Left Environment!",
        variant: "success",
      });
    },
    onError: () => {
      showToast({
        message: "Failed to leave environment",
        variant: "error",
      });
    },
  });

  const updateOpenDate = useAction(updateEnvironmentOpenedDate);

  const handleEnvironmentOpened = (id: string) => {
    updateOpenDate.execute({ id });
    router.push(`/dashboard/environment/${environment.id}`);
  };

  const isVariantSecondary = variant === "secondary" ? "default" : "secondary";

  return (
    <div className="relative">
      <Card
        className={cn(cardVariants({ variant }), {
          "blur-[5px]": deleteEnvironment.status === "executing",
        })}
        onClick={() => handleEnvironmentOpened(environment.id)}
      >
        <CardContent className="grid gap-2 ">
          <Title size="xs" className="font-medium">
            {name}
          </Title>
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-4">
              <EnvironmentOpenedBadge
                lastOpened={last_opened}
                variant={isVariantSecondary}
              />
              <EnvironmentLanguageBadge
                language={language as LanguageOptions}
                variant={isVariantSecondary}
              />
            </div>
            {environment.editors.length > 1 && (
              <EnvironmentCardEditors editors={environment.editors} />
            )}
          </div>
        </CardContent>
      </Card>
      <EnvironmentCardOptions
        deleteEnvironment={deleteEnvironment.execute}
        deleteStatus={deleteEnvironment.status}
        leaveEnvironment={leaveEnvironment.execute}
        leaveStatus={leaveEnvironment.status}
        environment={environment}
      />
      <Loader
        show={
          deleteEnvironment.status === "executing" ||
          leaveEnvironment.status === "executing"
        }
      />
    </div>
  );
};

export default EnvironmentCard;
