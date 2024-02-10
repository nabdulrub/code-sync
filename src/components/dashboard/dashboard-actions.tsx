import React from "react";
import NewEnvironmentModal from "./actions/new-environment-modal";

type Props = {};

const DashboardActions = (props: Props) => {
  return (
    <div>
      <NewEnvironmentModal />
    </div>
  );
};

export default DashboardActions;
