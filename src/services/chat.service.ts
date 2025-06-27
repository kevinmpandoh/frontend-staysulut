import api from "@/lib/axios";

export const chatService = {
  getChat: async () => {
    const response = await api.get(`/chat`);
    return response.data.data;
  },
  getMessageByChat: async (chatRoomId: string) => {
    const response = await api.get(`/chat/${chatRoomId}`);
    return response.data.data;
  },

  sendMessage: async (chatRoomId: string, message: string) => {
    await api.post(`/chat/${chatRoomId}/send`, {
      message,
    });
  },

  startChat: async (kostId: string) => {
    const response = await api.post(`/chat/start`, {
      tipe_kost: kostId,
    });
    return response.data.data;
  },
  getChatTenant: async (kostTypeId: string, tenantId: string) => {
    const response = await api.get(`/chat/owner/${kostTypeId}/${tenantId}`);
    return response.data.data;
  },
};
