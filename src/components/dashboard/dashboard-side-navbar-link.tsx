"use client";

import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ForwardRefExoticComponent } from "react";

export type DashboardLinkProps = {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<LucideProps>;
};

type Props = {
  link: DashboardLinkProps;
};

const DashboardSideNavbarLink = ({ link }: Props) => {
  const pathname = usePathname();

  return (
    <Link href={link.href}>
      {React.createElement(link.icon, {
        className: cn(
          "w-11 h-11 text-white p-2 rounded-md hover:bg-white/10 transition-all duration-300",
          { "bg-white/10": pathname === link.href }
        ),
        strokeWidth: 2.5,
      })}
    </Link>
  );
};

export default DashboardSideNavbarLink;
