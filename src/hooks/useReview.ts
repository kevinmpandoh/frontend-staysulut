"use client";

import { reviewService } from "@/services/review.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReview = () => {
  const queryClient = useQueryClient();

  //   const { data: reviewTenant, isLoading: loadingReview } = useQuery({
  //     queryKey: ["review"],
  //     queryFn: chatService.getChat,
  //   });

  const { mutate: reviewKost, isPending: isReview } = useMutation({
    mutationFn: ({ bookingId, data }: { bookingId: string; data: any }) =>
      reviewService.sendReview(bookingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["review"],
      });
    },
  });

  return {
    // chatList,
    // loadingChatList,
    reviewKost,
    isReview,
  };
};
