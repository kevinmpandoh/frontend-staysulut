"use client";
import { paymentService } from "@/services/payment.service";
import { useQuery } from "@tanstack/react-query";

export const usePayment = () => {
  const { data: tenantPayment, isLoading } = useQuery({
    queryKey: ["booking"], // supaya cache terpisah berdasarkan status
    queryFn: paymentService.getTenantPayments,
  });

  return {
    tenantPayment,
    isLoading,
  };
};
