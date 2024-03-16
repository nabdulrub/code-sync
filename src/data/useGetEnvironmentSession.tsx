import { getEnvironmentById } from "@/server/actions/environment";
import extractIdFromUrl from "@/utils/extractIdFromPathname";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function useGetEnvironmentSession() {
  const pathname = usePathname();
  const id = extractIdFromUrl(pathname);

  return useQuery({
    queryKey: ["environment-session"],
    queryFn: async () => getEnvironmentById({ id }),
    refetchInterval: 60480000000,
  });
}
