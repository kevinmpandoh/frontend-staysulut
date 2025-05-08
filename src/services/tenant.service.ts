import api from "@/lib/axios";

export const tenantService = {
  updateTenantCurrent: async (data: any) => {
    const response = await api.put(`/tenant/current`, data);
    return response.data;
  },

  changePassword: async (data: any) => {
    const response = await api.put(`/tenant/change-password`, data);
    return response.data.data;
  },
};
