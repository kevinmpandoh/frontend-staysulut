// services/billing.service.ts
import api from "@/lib/axios";
import type {
  Billing,
  Payment,
  CreatePaymentPayload,
} from "@/types/billing.type";

export const billingService = {
  getUnpaidBilling: async (bookingId: string): Promise<Billing | null> => {
    const res = await api.get("/tenant/billings/unpaid", {
      params: { bookingId },
    });
    return res.data.data ?? null;
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

  confirmPayment: async (billingId: string) => {
    const { data } = await api.patch(
      `/tenant/billings/${billingId}/confirm-payment`
    );
    return data;
  },

  changePaymentMethod: async ({
    billingId,
    provider,
  }: {
    billingId: string;
    provider: string;
  }) => {
    const { data } = await api.patch(
      `/tenant/billings/${billingId}/change-method`,
      {
        provider,
      }
    );
    return data;
  },
};

// export const billingService = {
//   getAllTenantBilling: async () => {
//     const response = await api.get("/tenant/billings");
//     return response.data.data;
//   },
//   getTenantBilling: async () => {
//     const response = await api.get("/tenant/billings/unpaid");
//     return response.data.data;
//   },
//   createPayment: async ({
//     billingId,
//     provider,
//   }: any): Promise<PaymentResponse> => {
//     const res = await api.post(`/tenant/billings/${billingId}/create-payment`, {
//       provider,
//     });
//     return res.data.data;
//   },
// };
