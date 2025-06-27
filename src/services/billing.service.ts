// services/billing.service.ts
import api from "@/lib/axios";
import type {
  Billing,
  Payment,
  CreatePaymentPayload,
} from "@/types/billing.type";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const billingService = {
  getBillingByBooking: async (bookingId: string): Promise<Billing[] | null> => {
    const res = await api.get("/tenant/billings", {
      params: { bookingId },
    });
    return res.data.data ?? null;
  },
  getBillingByInvoice: async (invoice: string): Promise<Billing | null> => {
    try {
      const response = await api.get(`/tenant/billings/${invoice}`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
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

  getOwnerBillings: async (params?: {
    status?: string;
    search?: string;
    month?: string;
  }): Promise<Billing[] | null> => {
    try {
      const query = new URLSearchParams();

      if (params?.status) query.set("status", params.status);
      if (params?.search) query.set("search", params.search);
      if (params?.month) query.set("month", params.month);

      const url = `/owner/billings${query.toString() ? `?${query}` : ""}`;

      const response = await api.get(url);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  getAdminBillings: async (): Promise<Billing[] | null> => {
    try {
      const response = await api.get(`/admin/billings/`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
