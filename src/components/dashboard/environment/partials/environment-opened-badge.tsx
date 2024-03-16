import { Badge } from "@/components/ui/badge";
import { timeSinceLastOpened } from "@/utils/timeSinceLastOpened";
import { EyeIcon, EyeOff } from "lucide-react";
import React from "react";
import { VariantProps } from "./environment-language-badge";

type Props = {
  lastOpened: Date | null;
  variant?: VariantProps;
};

const EnvironmentOpenedBadge = ({
  lastOpened,
  variant = "secondary",
}: Props) => {
  return (
    <Badge variant={variant} className="flex gap-2 items-center">
      {lastOpened ? timeSinceLastOpened(lastOpened) + " ago" : "Unopened"}
      {lastOpened ? (
        <EyeIcon className="w-4 h-4 " />
      ) : (
        <EyeOff className="w-4 h-4 " />
      )}
    </Badge>
  );
};

export default EnvironmentOpenedBadge;
