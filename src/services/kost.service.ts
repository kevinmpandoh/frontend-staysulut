import api from "@/lib/axios";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const KostService = {
  getKostList: async (params: Record<string, any>) => {
    const res = await api.get("/kost-type", { params });
    return res.data;
  },

  getKostRecomended: async () => {
    const res = await api.get("/tenant/kost-type/recomended");
    return res.data;
  },
  getKostSubmission: async () => {
    const res = await api.get("/admin/kosts/submission");
    return res.data;
  },

  getKostTypeDetail: (id: string) => {
    const result = api.get(`/kost-type/${id}`);

    return result;
  },
  createKost: (data: any) => api.post("/kosts", data),
  updateKost: (id: string, data: any) => api.put(`/kosts/${id}`, data),
  deleteKost: async (id: string) => {
    try {
      const response = await api.delete(`/owner/kosts/${id}`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  getKostDetailAdmin: async (id: string) => {
    const res = await api.get(`/admin/kosts/${id}`);
    return res.data.data;
  },

  getKostOwner: async (): Promise<any> => {
    try {
      const response = await api.get(`/owner/kosts/`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  getKostDetail: async (kostId: string) => {
    try {
      const response = await api.get(`/owner/kosts/${kostId}`);

      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  getKostCreate: async (kostId: string) => {
    try {
      const response = await api.get(`/owner/kosts/${kostId}/detail-create`);

      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  create: async (): Promise<any> => {
    try {
      const response = await api.get(`/owner/kosts/`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  approveKost: async (kostId: string): Promise<any> => {
    try {
      const response = await api.patch(`/admin/kosts/${kostId}/approve`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  rejectKost: async (kostId: string, reason: string): Promise<any> => {
    try {
      const response = await api.patch(`/admin/kosts/${kostId}/reject`, {
        alasan_penolakan: reason,
      });
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
