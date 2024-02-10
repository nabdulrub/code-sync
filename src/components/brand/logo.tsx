import { cn } from "@/lib/utils";
import React from "react";
import { Orbitron } from "next/font/google";
import Link from "next/link";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const size_variants = {
  xs: "lg:text-sm",
  sm: "lg:text-base",
  md: "lg:text-xl",
  lg: "lg:text-2xl",
  "2xl": "lg:text-3xl",
};

type Props = {
  size?: keyof typeof size_variants;
  className?: string;
  short?: boolean;
};

const Logo = ({ size = "sm", className, short }: Props) => {
  return (
    <Link href={"/"}>
      <div
        className={cn(
          orbitron.className,
          size_variants[size],
          "text-xl font-black",
          className
        )}
      >
        {short ? "CS" : "CodeSync"}
      </div>
    </Link>
  );
};

export default Logo;
