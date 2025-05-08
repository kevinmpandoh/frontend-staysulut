import api from "@/lib/axios";

export const bookingService = {
  createBooking: (data: any) => {
    return api.post("/tenant/booking", data);
  },
  getTenantBookings: async () => {
    const response = await api.get(`/tenant/booking`);
    return response.data.data;
  },

  getTenantBookingHistory: async () => {
    const response = await api.get("/tenant/booking/history");
    return response.data.data;
  },
  checkInBooking: async (bookingId: string) => {
    const res = await api.post(`/tenant/booking/${bookingId}/check-in`);
    return res.data;
  },
  checkOutBooking: async (bookingId: string) => {
    const res = await api.post(`/tenant/booking/${bookingId}/check-out`);
    return res.data;
  },

  getActiveTenantBooking: async () => {
    const res = await api.get("/tenant/booking/active");
    return res.data.data;
  },

  stopBooking: async (bookingId: string, data: any) => {
    const res = await api.post(`/tenant/booking/${bookingId}/stop-rent`, data);
    return res.data;
  },
};
