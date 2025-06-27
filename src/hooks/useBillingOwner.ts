// hooks/useBilling.ts

import { billingService } from "@/services/billing.service";
import { useQuery } from "@tanstack/react-query";

export const useOwnerBilling = ({
  status,
  search,
  month,
}: {
  status?: string;
  search?: string;
  month?: string;
}) => {
  const { data: billings, isLoading: loadingBillings } = useQuery({
    queryKey: ["billing", status, search, month], // agar refetch saat filter berubah
    queryFn: () =>
      billingService.getOwnerBillings({
        status,
        search,
        month,
      }),
  });
  return {
    billings,
    loadingBillings,
  };
};
