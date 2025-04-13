import { useQuery } from "@tanstack/react-query";
import { getKostDetail } from "@/services/kost.service";

export function useKostDetail(id: string) {
  return useQuery({
    queryKey: ["kost", id],
    queryFn: () => getKostDetail(id).then((res) => res.data),
    enabled: !!id,
  });
}
