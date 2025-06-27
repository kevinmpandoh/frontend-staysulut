import api from "@/lib/axios";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const roomService = {
  getRoomsByKostType: async (kostTypeId: string, status?: string) => {
    const response = await api.get(
      `/owner/rooms/${kostTypeId}?status=${status ?? ""}`
    );
    return response.data.data;
  },

  createRoom: async (
    kostTypeId: string,
    data: {
      nomor_kamar: string;
      lantai: number;
      status_ketersediaan: string;
    }
  ) => {
    try {
      const response = await api.post(`/owner/rooms/${kostTypeId}`, data);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  updateRoom: async (
    roomId: string,
    data: { nomor_kamar: string; lantai: number }
  ) => {
    try {
      const response = await api.put(`/owner/rooms/${roomId}`, data);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  deleteRoom: async (roomId: string) => {
    try {
      const response = await api.delete(`/owner/rooms/${roomId}`);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};
