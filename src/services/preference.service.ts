import api from "@/lib/axios";

export const preferenceService = {
  createOrUpdatePreference: (data: any) => api.post("/tenant/preference", data),
  getPreference: async () => {
    const res = await api.get("/tenant/preference");
    return res.data.data;
  },
};
