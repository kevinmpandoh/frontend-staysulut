"use client";
// hooks/useWishlist.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { bookingService } from "@/services/booking.service";
import { toast } from "sonner";

export const useBooking = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking"], // supaya cache terpisah berdasarkan status
    queryFn: bookingService.getTenantBookings,
  });

  // Booking aktif (khusus status aktif)
  const { data: activeBooking, isLoading: loadingActive } = useQuery({
    queryKey: ["booking", "active"],
    queryFn: bookingService.getActiveTenantBooking,
  });

  // Booking History (khusus status selesai)
  const { data: bookingHistory, isLoading: loadingHistory } = useQuery({
    queryKey: ["booking-selsai"],
    queryFn: bookingService.getTenantBookingHistory,
  });

  const { mutate: add, isPending: creating } = useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });

  const { mutate: checkIn, isPending: checkingIn } = useMutation({
    mutationFn: bookingService.checkInBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] }); // Refresh booking list
      router.push("/user/kost-saya");
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(
        err.response.data.message || "Terjadi kesalahan. Silahakn coba lagi"
      );
    },
  });
  const { mutate: checkOut, isPending: checkingOut } = useMutation({
    mutationFn: bookingService.checkOutBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] }); // Refresh booking list
    },
  });

  const { mutate: stopBooking, isPending: stopingBooking } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      bookingService.stopBooking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] }); // Refresh booking list
    },
  });

  return {
    createBooking: add,
    creating,
    booking,
    isLoading,
    checkIn,
    checkingIn,
    activeBooking,
    loadingActive,
    bookingHistory,
    loadingHistory,
    stopBooking,
    stopingBooking,
    checkOut,
    checkingOut,
  };
};
