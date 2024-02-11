import React from "react";
import NewEnvironmentModal from "./actions/new-environment-modal";
import InviteUserModal from "./actions/invite-user-modal";

type Props = {};

const DashboardActions = (props: Props) => {
  return (
    <div className="flex gap-4">
      <InviteUserModal />
      <NewEnvironmentModal />
    </div>
  );
};

export default DashboardActions;
