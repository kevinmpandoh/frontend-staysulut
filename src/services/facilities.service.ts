import api from "@/lib/axios";

export const getFacilities = async () => {
  const response = await api.get("/facilities");
  return response.data.data; // asumsi sudah berupa array of { id, name, type }
};
