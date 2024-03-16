import { getAllUserIncomingInvitiations } from "@/server/actions/invitiations";
import { useQuery } from "@tanstack/react-query";

export function useGetNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => getAllUserIncomingInvitiations(),
    refetchInterval: 12000,
  });
}
