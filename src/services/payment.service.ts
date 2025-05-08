import api from "@/lib/axios";

export const paymentService = {
  getTenantPayments: async () => {
    const response = await api.get(`/tenant/payments`);
    return response.data.data;
  },
};
