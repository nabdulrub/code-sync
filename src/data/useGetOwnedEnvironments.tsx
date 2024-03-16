import { getAllOwnedEnvironments } from "@/server/actions/environment";
import { useQuery } from "@tanstack/react-query";

export function useGetOwnedEnvironments() {
  return useQuery({
    queryKey: ["owned-environments"],
    queryFn: async () => getAllOwnedEnvironments(),
    refetchInterval: 604800000,
  });
}
