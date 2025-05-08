"use client";

import { chatService } from "@/services/chat.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChat = () => {
  const queryClient = useQueryClient();

  const { data: chatList, isLoading: loadingChatList } = useQuery({
    queryKey: ["chat", "message"],
    queryFn: chatService.getChat,
  });

  const { mutate: startChat, isPending: startingChat } = useMutation({
    mutationFn: chatService.startChat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat", "message"],
      });
    },
  });

  return {
    chatList,
    loadingChatList,
    startChat,
    startingChat,
  };
};
