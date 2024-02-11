import ProtectedPage from "@/components/auth/protected-page";
import EnvironmentNavbar from "@/components/dashboard/environment/environment-navbar";
import { getEnvironmentById } from "@/server/actions/environment";

export default async function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const environment = await getEnvironmentById({ id });

  return (
    <ProtectedPage>
      <EnvironmentNavbar environment={environment.data} />
      {children}
    </ProtectedPage>
  );
}
