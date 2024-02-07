"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "../layout/navbar";

type Props = {};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return pathname !== "/signin" && pathname !== "/register" ? (
    <div>
      <Navbar /> {children}
    </div>
  ) : (
    <div>{children}</div>
  );
};

export default Layout;
