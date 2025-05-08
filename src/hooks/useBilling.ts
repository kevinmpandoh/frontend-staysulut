// hooks/useBilling.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { billingService } from "@/services/billing.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useBilling = (bookingId: string) => {
  const queryClient = useQueryClient();

  const {
    data: unpaidBilling,
    isLoading: loadingBilling,
    error: billingError,
  } = useQuery({
    queryKey: ["billing", "unpaid"],
    queryFn: () => billingService.getUnpaidBilling(bookingId),
    enabled: !!bookingId,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const {
    data: payment,
    isLoading: loadingPayment,
    refetch: refetchPayment,
  } = useQuery({
    queryKey: ["billing", "payment", unpaidBilling?.id],
    queryFn: () =>
      unpaidBilling
        ? billingService.getBillingPayment(unpaidBilling.id)
        : Promise.resolve(null),
    enabled: !!unpaidBilling?.id && unpaidBilling?.hasPayment === true,
  });

  const { mutate: confirmPayment, isPending: confirmingPayment } = useMutation({
    mutationFn: (billingId: string) => billingService.confirmPayment(billingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing", "unpaid"] });
      queryClient.invalidateQueries({
        queryKey: ["billing", "payment", unpaidBilling?.id],
      });
    },
    onError: (error: unknown) => {
      if (
        error &&
        typeof error === "object" &&
        "isAxiosError" in error &&
        (error as AxiosError).isAxiosError
      ) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(
          axiosError.response?.data?.message ||
            "Gagal mengonfirmasi pembayaran."
        );
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui.");
      }
    },
  });

  const { mutate: createPayment, isPending: creatingPayment } = useMutation({
    mutationFn: ({
      billingId,
      provider,
    }: {
      billingId: string;
      provider: string;
    }) => billingService.createPayment({ billingId, provider }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["billing", "payment", unpaidBilling?.id],
      });
      refetchPayment();
    },
  });

  const { mutate: changeMethod, isPending: changingMethod } = useMutation({
    mutationFn: ({
      billingId,
      provider,
    }: {
      billingId: string;
      provider: string;
    }) => billingService.changePaymentMethod({ billingId, provider }),
    onSuccess: () => {
      toast.success("Berhasil mengganti metode pembayaran.");
      queryClient.invalidateQueries({
        queryKey: ["billing", "payment", unpaidBilling?.id],
      });
      refetchPayment(); // Refresh data payment
    },
    onError: (error: unknown) => {
      if (
        error &&
        typeof error === "object" &&
        "isAxiosError" in error &&
        (error as AxiosError).isAxiosError
      ) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(
          axiosError.response?.data?.message ||
            "Gagal mengganti metode pembayaran."
        );
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui.");
      }
    },
  });

  return {
    unpaidBilling,
    loadingBilling,
    payment,
    loadingPayment,
    createPayment,
    creatingPayment,
    confirmPayment,
    confirmingPayment,
    billingError,
    changeMethod,
    changingMethod,
  };
};
