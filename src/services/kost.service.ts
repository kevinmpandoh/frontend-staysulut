import api from "@/lib/axios";

export const KostService = {
  getKostList: async (params: Record<string, any>) => {
    const res = await api.get("/kost-type", { params });
    return res.data;
  },

  getKostRecomended: async () => {
    const res = await api.get("/tenant/kost-type/recomended");
    return res.data;
  },

  getKostDetail: (id: string) => {
    const result = api.get(`/kost-type/${id}`);

    return result;
  },
  createKost: (data: any) => api.post("/kosts", data),
  updateKost: (id: string, data: any) => api.put(`/kosts/${id}`, data),
  deleteKost: (id: string) => api.delete(`/kosts/${id}`),
};
