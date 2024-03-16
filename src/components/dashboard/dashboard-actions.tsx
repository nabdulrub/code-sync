import React from "react";
import NewEnvironmentModal from "./actions/new-environment-modal";
import InviteUserModal from "./actions/invite-user-modal";
import UserNotificationDropDown from "./actions/user-notification-dropdown";

type Props = {};

const DashboardActions = (props: Props) => {
  return (
    <div className="flex gap-4">
      <InviteUserModal />
      <NewEnvironmentModal />
      <UserNotificationDropDown />
    </div>
  );
};

export default DashboardActions;
