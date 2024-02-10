"use client";

import { useSession } from "next-auth/react";
import RegisterButton from "../auth/register-button";
import SignInButton from "../auth/sign-in-button";
import Logo from "../brand/logo";
import DashboardButton from "../dashboard/dashboard-button";

type Props = {};

const Navbar = (props: Props) => {
  const { status } = useSession();

  return (
    <nav className="py-8 px-16 flex justify-between items-center">
      <Logo size="2xl" />
      <div className="flex gap-4">
        {status === "authenticated" ? (
          <DashboardButton />
        ) : (
          <>
            <RegisterButton />
            <SignInButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
