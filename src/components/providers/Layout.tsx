"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "../layout/navbar";
import DashboardSideNavbar from "../dashboard/dashboard-side-navbar";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

type Props = {
  session: any;
  children: React.ReactNode;
};

const Layout = ({ children, session }: Props) => {
  const pathname = usePathname();

  return pathname !== "/signin" &&
    pathname !== "/register" &&
    !pathname.includes("/dashboard") ? (
    <div>
      <Navbar /> {children}
    </div>
  ) : (
    <div>{children}</div>
  );
};

export default Layout;
