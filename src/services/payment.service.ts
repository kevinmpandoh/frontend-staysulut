import api from "@/lib/axios";
import type { Payment, CreatePaymentPayload } from "@/types/billing.type";

export const paymentService = {
  getTenantPayments: async () => {
    const response = await api.get(`/tenant/payments`);
    return response.data.data;
  },

  getBillingPayment: async (billingId: string): Promise<Payment | null> => {
    const res = await api.get(`/tenant/payments/${billingId}`);
    return res.data.data ?? null;
  },
  createPayment: async ({
    billingId,
    ...payload
  }: CreatePaymentPayload & { billingId: string }): Promise<Payment> => {
    const res = await api.post(
      `/tenant/billings/${billingId}/create-payment`,
      payload
    );
    return res.data.data;
  },

  confirmPayment: async (paymentId: string) => {
    const { data } = await api.patch(
      `/tenant/payments/${paymentId}/confirm-payment`
    );
    return data;
  },

  changePaymentMethod: async ({
    paymentId,
    provider,
  }: {
    paymentId: string;
    provider: string;
  }) => {
    const { data } = await api.patch(
      `/tenant/payments/${paymentId}/change-method`,
      {
        provider,
      }
    );
    return data;
  },
};
