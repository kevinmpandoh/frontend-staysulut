import api from "@/lib/axios";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const bookingService = {
  createBooking: (data: any) => {
    return api.post("/tenant/booking", data);
  },
  getTenantBookings: async () => {
    const response = await api.get(`/tenant/booking`);
    return response.data.data ?? null;
  },
  getAdminBookings: async () => {
    const response = await api.get(`/admin/bookings`);
    return response.data.data;
  },

  getOwnerBookings: async (status: string) => {
    const query = status && status !== "all" ? `?status=${status}` : "";
    console.log(query, "QUERY");
    const response = await api.get(`/owner/bookings${query}`);
    return response.data.data;
  },
  getBiodataTenant: async (bookingId: string) => {
    const response = await api.get(`/owner/bookings/${bookingId}`);
    return response.data.data;
  },
  approveBookings: async (bookingId: string, room: string) => {
    const response = await api.patch(`/owner/bookings/${bookingId}/approve`, {
      room,
    });
    return response.data.data;
  },
  rejectBookings: async (bookingId: string, data: any) => {
    const response = await api.patch(
      `/owner/bookings/${bookingId}/reject`,
      data
    );
    return response.data;
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
  getActiveOwnerBooking: async () => {
    const res = await api.get("/owner/bookings/active");
    return res.data.data;
  },

  stopBooking: async (bookingId: string, data: any) => {
    const res = await api.post(`/tenant/booking/${bookingId}/stop-rent`, data);
    return res.data;
  },

  stopRentTenant: async (bookingId: string, data: any) => {
    const res = await api.post(
      `/owner/bookings/${bookingId}/stop-rent-tenant`,
      data
    );
    return res.data;
  },

  acceptStopRent: async (bookingId: string) => {
    return api.post(`/owner/bookings/${bookingId}/accept-stop-rent`);
  },

  rejectStopRent: (bookingId: string, reason: string) => {
    try {
      return api.post(`/owner/bookings/${bookingId}/reject-stop-rent`, {
        reason,
      });
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  updateBooking: async (bookingId: string, payload: any) => {
    const res = await api.put(`/admin/bookings/${bookingId}`, payload);
    return res.data;
  },
};
