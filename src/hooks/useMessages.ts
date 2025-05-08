"use client";

import { chatService } from "@/services/chat.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMessages = (chatRoomId: string) => {
  const queryClient = useQueryClient();

  // Booking aktif (khusus status aktif)
  const { data: messages, isLoading: loadingMessages } = useQuery({
    queryKey: ["chat", "message", chatRoomId],
    queryFn: () => chatService.getMessageByChat(chatRoomId),
    enabled: !!chatRoomId,
  });

  const { mutate: sendMessage, isPending: seendingMessage } = useMutation({
    mutationFn: ({
      chatRoomId,
      message,
    }: {
      chatRoomId: string;
      message: string;
    }) => chatService.sendMessage(chatRoomId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat", "message"],
      });
    },
  });

  return {
    messages,
    loadingMessages,
    sendMessage,
    seendingMessage,
  };
};
