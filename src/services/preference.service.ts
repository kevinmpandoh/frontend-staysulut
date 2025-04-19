import api from "@/lib/axios";

export const PreferenceService = {
  createPreference: (data: any) => api.post("/tenant/preference", data),
  getPreference: async () => {
    const res = await api.get("/tenant/preference");
    return res.data.data;
  },
};
