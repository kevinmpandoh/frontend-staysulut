// hooks/useBilling.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { billingService } from "@/services/billing.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UseBillingProps = {
  bookingId?: string;
  invoice?: string;
};

export const useBilling = ({ bookingId, invoice }: UseBillingProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: billings, isLoading: loadingBillings } = useQuery({
    queryKey: ["billing"],
    queryFn: () => billingService.getBillingByBooking(bookingId!),
    enabled: !!bookingId,
  });

  const {
    data: billing,
    isLoading: loadingBilling,
    error: errorBilling,
  } = useQuery({
    queryKey: ["billing-payment"],
    queryFn: () => billingService.getBillingByInvoice(invoice!),
    enabled: !!invoice,
    retry: false,
  });

  const {
    data: unpaidBilling,
    isLoading: loadingUnpaidBilling,
    error: billingError,
  } = useQuery({
    queryKey: ["billing", "unpaid"],
    queryFn: () => billingService.getUnpaidBilling(bookingId!),
    enabled: !!bookingId,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const {
    data: payment,
    isLoading: loadingPayment,
    refetch: refetchPayment,
  } = useQuery({
    queryKey: ["billing", "payment"],
    queryFn: () =>
      billing
        ? billingService.getBillingPayment(billing.id)
        : Promise.resolve(null),
    enabled: !!billing?.id && billing?.hasPayment === true,
  });

  const { mutate: confirmPayment, isPending: confirmingPayment } = useMutation({
    mutationFn: (billingId: string) => billingService.confirmPayment(billingId),
    onSuccess: (response) => {
      const paymentStatus = response?.data?.transaction_status;
      if (paymentStatus === "settlement" || paymentStatus === "success") {
        toast.success("Pembayaran berhasil dikonfirmasi.");
        router.replace("/user/pengajuan-sewa");
      } else if (paymentStatus === "pending") {
        toast.info("Pembayaran sedang diproses. Silakan cek kembali nanti.");
      } else {
        toast.error("Status pembayaran tidak valid atau gagal.");
      }
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
    billings,
    loadingBillings,
    errorBilling,
    billing,
    loadingBilling,
    unpaidBilling,
    loadingUnpaidBilling,
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
