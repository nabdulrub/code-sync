import ProtectedPage from "@/components/auth/protected-page";
import DashboardSideNavbar from "@/components/dashboard/dashboard-side-navbar";
import DashboardQueryProvider from "@/components/providers/dashboard-query-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPage>
      <DashboardQueryProvider>
        <div className="flex">
          <DashboardSideNavbar />
          <div className="w-full max-h-[830px]">{children}</div>
        </div>
      </DashboardQueryProvider>
    </ProtectedPage>
  );
}
