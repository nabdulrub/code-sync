import ProtectedPage from "@/components/auth/protected-page";
import DashboardPage from "@/components/pages/dashboard-page";
import protectServerPage from "@/services/next-auth/protectServerPage";
import React from "react";

type Props = {};

const Dashboard = async (props: Props) => {
  return <DashboardPage />;
};

export default Dashboard;
