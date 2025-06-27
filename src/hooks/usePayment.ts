"use client";
import { paymentService } from "@/services/payment.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePayment = ({
  billingId,
  hasPayment,
}: {
  billingId?: string;
  hasPayment?: boolean;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: tenantPayment, isLoading } = useQuery({
    queryKey: ["booking"], // supaya cache terpisah berdasarkan status
    queryFn: paymentService.getTenantPayments,
  });

  const {
    data: payment,
    isLoading: loadingPayment,
    refetch: refetchPayment,
  } = useQuery({
    queryKey: ["billing", "payment"],
    queryFn: () => paymentService.getBillingPayment(billingId!),

    enabled: !!billingId && hasPayment === true,
  });

  const { mutate: createPayment, isPending: creatingPayment } = useMutation({
    mutationFn: ({
      billingId,
      provider,
    }: {
      billingId: string;
      provider: string;
    }) => paymentService.createPayment({ billingId, provider }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["billing", "payment"],
      });
      refetchPayment();
    },
  });

  const { mutate: confirmPayment, isPending: confirmingPayment } = useMutation({
    mutationFn: (paymentId: string) => paymentService.confirmPayment(paymentId),
    onSuccess: (response) => {
      const paymentStatus = response?.data?.transaction_status;
      if (paymentStatus === "settlement" || paymentStatus === "success") {
        toast.success("Pembayaran berhasil dikonfirmasi.");
        router.push("/user/pengajuan-sewa");
      } else if (paymentStatus === "pending") {
        toast.info("Pembayaran sedang diproses. Silakan cek kembali nanti.");
      } else {
        toast.error("Status pembayaran tidak valid atau gagal.");
      }
      queryClient.invalidateQueries({ queryKey: ["billing", "unpaid"] });
      queryClient.invalidateQueries({
        queryKey: ["billing", "payment"],
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

  const { mutate: changeMethod, isPending: changingMethod } = useMutation({
    mutationFn: ({
      paymentId,
      provider,
    }: {
      paymentId: string;
      provider: string;
    }) => paymentService.changePaymentMethod({ paymentId, provider }),
    onSuccess: () => {
      toast.success("Berhasil mengganti metode pembayaran.");
      queryClient.invalidateQueries({
        queryKey: ["billing", "payment"],
      });
      // refetchPayment(); // Refresh data payment
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
    tenantPayment,
    isLoading,
    payment,
    loadingPayment,
    createPayment,
    creatingPayment,
    confirmPayment,
    confirmingPayment,
    changeMethod,
    changingMethod,
  };
};
