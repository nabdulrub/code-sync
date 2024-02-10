import ProtectedPage from "@/components/auth/protected-page";
import DashboardSideNavbar from "@/components/dashboard/dashboard-side-navbar";
import DashboardProvider from "@/components/providers/dashboard-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPage>
      <DashboardProvider>
        <div className="flex">
          <DashboardSideNavbar />
          {children}
        </div>
      </DashboardProvider>
    </ProtectedPage>
  );
}
