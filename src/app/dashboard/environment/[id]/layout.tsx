import ProtectedPage from "@/components/auth/protected-page";
import EnvironmentNavbar from "@/components/dashboard/environment/navbar/environment-navbar";
import { EnvironmentJoinStoreProvider } from "@/store/environment-join-store";
import EnvironmentSessionStore from "@/store/environment-session.store";

export default async function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <ProtectedPage>
      <EnvironmentSessionStore environmentId={id}>
        <EnvironmentJoinStoreProvider>
          <EnvironmentNavbar />
          {children}
        </EnvironmentJoinStoreProvider>
      </EnvironmentSessionStore>
    </ProtectedPage>
  );
}
