import { getEnvironmentById } from "@/server/actions/environment";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
  environmentId: string;
};

const EnvironmentSessionStore = async ({ children, environmentId }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["environment-session"],
    queryFn: async () => getEnvironmentById({ id: environmentId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default EnvironmentSessionStore;
