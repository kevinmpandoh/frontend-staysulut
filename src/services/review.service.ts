import api from "@/lib/axios";

export const reviewService = {
  getOwnerReview: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    rating?: number;
  }) => {
    const response = await api.get(`/owner/reviews`, {
      params,
    });
    return response.data.data;
  },
  getAdminReview: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    rating?: number;
  }) => {
    const response = await api.get(`/admin/reviews`, {
      params,
    });
    return response.data.data;
  },

  sendReview: async (bookingId: string, data: any) => {
    await api.post(`/tenant/booking/${bookingId}/review`, data);
  },
  replyReview: async (reviewId: string, reply: any) => {
    await api.post(`/owner/reviews/${reviewId}`, {
      message: reply,
    });
  },
};
