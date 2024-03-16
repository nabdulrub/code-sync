import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

type EnvironmentEditorAvatarProps = HTMLAttributes<HTMLDivElement> & {
  initials?: string;
  highlight?: boolean;
};

const EnvironmentEditorAvatar = ({
  initials = "M",
  className,
  highlight,
  ...props
}: EnvironmentEditorAvatarProps) => {
  return (
    <Avatar
      {...props}
      className={cn(
        "bg-accent flex w-8 h-8 items-center justify-center shadow-[5px_0px_10px_-5px] shadow-black fade-in-65 transition-all duration-1000 delay-200",
        { "border-4 border-primary": highlight },
        className
      )}
    >
      {initials}
    </Avatar>
  );
};

export default EnvironmentEditorAvatar;
