"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { bookingService } from "@/services/booking.service";

export const useBookingOwner = ({ status = "all" }: { status?: string }) => {
  const queryClient = useQueryClient();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", status],
    queryFn: () => bookingService.getOwnerBookings(status),
  });

  // // Booking aktif (khusus status aktif)
  const { data: activeBooking, isLoading: loadingActive } = useQuery({
    queryKey: ["booking", "Aktif"],
    queryFn: bookingService.getActiveOwnerBooking,
  });

  const { data: getBiodataTenant, isLoading: loadingBiodataTenant } = useQuery({
    queryKey: ["booking", "Aktif"],
    queryFn: bookingService.getActiveOwnerBooking,
  });

  // // Booking History (khusus status selesai)
  // const { data: bookingHistory, isLoading: loadingHistory } = useQuery({
  //   queryKey: ["booking", "Selesai"],
  //   queryFn: bookingService.getTenantBookingHistory,
  // });

  // const { mutate: add, isPending: creating } = useMutation({
  //   mutationFn: bookingService.createBooking,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["booking"] });
  //   },
  // });

  const { mutate: approveBooking, isPending: approving } = useMutation({
    mutationFn: ({ id, room }: { id: string; room: string }) =>
      bookingService.approveBookings(id, room),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] }); // Refresh booking list
    },
  });
  const { mutate: rejectBooking, isPending: rejecting } = useMutation({
    mutationFn: ({ bookingId, data }: { bookingId: string; data: any }) =>
      bookingService.rejectBookings(bookingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] }); // Refresh booking list
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
    booking,
    isLoading,
    getBiodataTenant,
    loadingBiodataTenant,
    approveBooking,
    approving,
    rejectBooking,
    rejecting,
    stopBooking,
    stopingBooking,
    checkOut,
    checkingOut,
    activeBooking,
    loadingActive,
  };
};
