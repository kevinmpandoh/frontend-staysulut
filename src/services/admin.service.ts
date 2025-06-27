import api from "@/lib/axios";

export const adminService = {
  getAllAdmins: async () => {
    const res = await api.get("/admin/user/admin");
    return res.data.data;
  },
  createAdmin: async (payload: { name: string; email: string }) => {
    return api.post("/admin/user/admin", payload);
  },

  changePassword: async (data: any) => {
    const response = await api.put(`/admin/change-password`, data);
    return response.data.data;
  },
  getAdminCurrent: async () => {
    const response = await api.get(`/admin/current`);
    return response.data.data;
  },

  updateAdminProfile: async (payload: { name: string; phone: string }) => {
    const res = await api.put("/admin/profile", payload);
    return res.data;
  },
  uploadProfile: async (formData: FormData): Promise<any> => {
    const response = await api.post(`/admin/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
