import React from "react";
import DashboardSideNavbar from "../dashboard/dashboard-side-navbar";
import DashboardWelcomeHeader from "../dashboard/dashboard-welcome-header";
import OwnedEnvironments from "../dashboard/owned/owned-environments";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="mt-8 w-full">
      <DashboardWelcomeHeader />
      <OwnedEnvironments />
    </div>
  );
};

export default DashboardPage;
