import { getAllOwnedEnvironments } from "@/server/actions/environment";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const EnvironmentListStore = async ({ children }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["environments"],
    queryFn: async () => getAllOwnedEnvironments(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default EnvironmentListStore;
