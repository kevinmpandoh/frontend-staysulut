// hooks/useBilling.ts

import { billingService } from "@/services/billing.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminBilling = () => {
  const { data: billings, isLoading: loadingBillings } = useQuery({
    queryKey: ["billing"],
    queryFn: () => billingService.getAdminBillings(),
  });

  return {
    billings,
    loadingBillings,
  };
};
