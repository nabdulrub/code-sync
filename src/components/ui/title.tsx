import { cn } from "@/lib/utils";
import React, { HTMLAttributes, ReactNode } from "react";

const size_variants = {
  xs: "text-md md:text-lg",
  sm: "text-xl md:text-2xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-5xl",
  "2xl": "text-4xl md:text-6xl",
};

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: keyof typeof size_variants;
  strong?: boolean;
}

const Title = ({ size = "xs", className, strong, ...props }: TitleProps) => {
  return (
    <h2
      className={cn(size_variants[size], { "font-bold": strong }, className)}
      {...props}
    />
  );
};

export default Title;
