import DashboardWelcomeHeader from "../dashboard/dashboard-welcome-header";
import JoinedEnvironments from "../dashboard/owned/joined-environments";
import OwnedEnvironments from "../dashboard/owned/owned-environments";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="mt-8 w-full">
      <DashboardWelcomeHeader />
      <OwnedEnvironments />
      <JoinedEnvironments />
    </div>
  );
};

export default DashboardPage;
