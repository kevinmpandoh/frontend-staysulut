"use client";

import { chatService } from "@/services/chat.service";
import { useAuthStore } from "@/stores/auth.store";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChat = () => {
  const queryClient = useQueryClient();
  const { openPopupWithChatId } = useChatPopupStore();
  const { user } = useAuthStore();

  const { data: chatList, isLoading: loadingChatList } = useQuery({
    queryKey: ["chat", "message"],
    queryFn: chatService.getChat,
    enabled: !!user,
  });

  const { mutate: startChat, isPending: startingChat } = useMutation({
    mutationFn: chatService.startChat,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["chat", "message"],
      });
      openPopupWithChatId(res._id);
    },
  });
  const { mutate: getChatTenant, isPending: gettingChatTenant } = useMutation({
    mutationFn: ({
      kostTypeId,
      tenantId,
    }: {
      kostTypeId: string;
      tenantId: string;
    }) => chatService.getChatTenant(kostTypeId, tenantId),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["chat", "message"],
      });
      openPopupWithChatId(res._id);
    },
  });

  return {
    chatList,
    loadingChatList,
    startChat,
    startingChat,
    getChatTenant,
    gettingChatTenant,
  };
};
