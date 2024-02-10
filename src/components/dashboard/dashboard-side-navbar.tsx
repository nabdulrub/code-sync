"use client";

import { DASHBOARD_PATHS as dashboardPaths } from "@/constants";
import SignOutButton from "../auth/sign-out-button";
import Logo from "../brand/logo";
import DashboardSideNavbarLink from "./dashboard-side-navbar-link";

type Props = {};

const DashboardSideNavbar = (props: Props) => {
  return (
    <div className="group max-w-[90px] min-h-screen h-full bg-secondary px-4 py-8 flex flex-col justify-between border-r-2 border-accent items-center">
      <div>
        <Logo size="2xl" short />
        <div className="flex flex-col items-center justify-center mt-20 gap-12 ">
          {dashboardPaths.map((path, index) => (
            <DashboardSideNavbarLink link={path} key={index} />
          ))}
        </div>
      </div>
      <SignOutButton />
    </div>
  );
};

export default DashboardSideNavbar;
