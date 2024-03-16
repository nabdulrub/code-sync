import { getAllJoinedEnvironments } from "@/server/actions/environment";
import { useQuery } from "@tanstack/react-query";

export function useGetJoinedEnvironments() {
  return useQuery({
    queryKey: ["joined-environments"],
    queryFn: async () => getAllJoinedEnvironments(),
  });
}
