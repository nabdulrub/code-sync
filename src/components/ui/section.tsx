import React from "react";
import { twMerge } from "tailwind-merge";

export const bg_variants = {
  transparent: "bg-transparent",
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  destructive: "bg-destructive",
};

const size_variants = {
  none: "",
  sm: "p-8 md:p-8 lg:p-10",
  md: "p-8 md:p-10 lg:p-16",
  lg: "p-8 md:p-14 lg:p-20",
  xl: "p-8 md:p-16 lg:p-28",
  xs: "px-8 md:px-16 lg:px-28",
};

type SectionContainerProps = {
  children?: React.ReactNode;
  className?: string;
  background?: keyof typeof bg_variants;
  size?: keyof typeof size_variants;
  maxWidth?: string | number;
  id?: string;
};

const Section = ({
  children,
  className,
  id,
  background = "primary",
  size = "md",
}: SectionContainerProps) => {
  return (
    <section
      id={id}
      className={twMerge(
        "bg-no-repeat bg-cover",
        bg_variants[background],
        size_variants[size],
        className
      )}
    >
      <div className="mx-auto">{children}</div>
    </section>
  );
};

export default Section;
