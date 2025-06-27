import { useQuery } from "@tanstack/react-query";
import { getOwnerDashboard } from "@/services/owner.service";

export const useOwnerDashboard = () => {
  return useQuery({
    queryKey: ["owner-dashboard"],
    queryFn: getOwnerDashboard,
  });
};
