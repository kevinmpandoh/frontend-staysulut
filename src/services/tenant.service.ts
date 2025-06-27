import api from "@/lib/axios";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const tenantService = {
  updateTenantCurrent: async (data: any) => {
    const response = await api.put(`/tenant/current`, data);
    return response.data;
  },

  changePassword: async (data: any) => {
    const response = await api.put(`/tenant/change-password`, data);
    return response.data.data;
  },

  getAll: async (): Promise<any> => {
    try {
      const response = await api.get(`/admin/user/tenant`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  uploadProfile: async (formData: FormData): Promise<any> => {
    try {
      const response = await api.post(`/tenant/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
