import api from "@/lib/axios";

export const getKostList = async (params: Record<string, any>) => {
  // const res = await api.get("/kosts", { params });
  const res = await api.get("/kost-type", {
    params,
  });
  return res.data;
};

// export const getKostList = (params?: any) => api.get("/kosts", { params });

export const getKostDetail = (id: string) => api.get(`/kosts/${id}`);

export const createKost = (data: any) => api.post("/kosts", data);

export const updateKost = (id: string, data: any) =>
  api.put(`/kosts/${id}`, data);

export const deleteKost = (id: string) => api.delete(`/kosts/${id}`);
