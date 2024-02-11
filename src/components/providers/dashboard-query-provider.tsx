import EnvironmentListStore from "@/store/environment-list-store";
import React from "react";

type Props = {};

const DashboardQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <EnvironmentListStore>{children}</EnvironmentListStore>;
};

export default DashboardQueryProvider;
