// hooks/useStopRentActions.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "@/services/booking.service";
import { toast } from "sonner"; // atau react-hot-toast

export const useStopRentActions = (bookingId: string) => {
  const queryClient = useQueryClient();

  const acceptMutation = useMutation({
    mutationFn: () => bookingService.acceptStopRent(bookingId),
    onSuccess: () => {
      toast.success("Pengajuan berhasil disetujui");
      queryClient.invalidateQueries({ queryKey: ["tenant-bookings"] });
    },
    onError: () => {
      toast.error("Gagal menyetujui pengajuan");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (reason: string) =>
      bookingService.rejectStopRent(bookingId, reason),
    onSuccess: () => {
      toast.success("Pengajuan berhasil ditolak");
      queryClient.invalidateQueries({ queryKey: ["tenant-bookings"] });
    },
    onError: (err) => {
      console.log(err, "ERRORNYA");
      toast.error("Gagal menolak pengajuan");
    },
  });

  return {
    acceptMutation,
    rejectMutation,
  };
};
