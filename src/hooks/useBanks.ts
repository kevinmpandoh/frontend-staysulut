import { useQuery } from "@tanstack/react-query";
import { getBanks } from "@/services/payout.service";

export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });
};
