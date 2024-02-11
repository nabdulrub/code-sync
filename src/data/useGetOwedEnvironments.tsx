import { getAllOwnedEnvironments } from "@/server/actions/environment";
import { useQuery } from "@tanstack/react-query";

export function useGetOwnedEnvironments() {
  return useQuery({
    queryKey: ["environments"],
    queryFn: async () => getAllOwnedEnvironments(),
  });
}
