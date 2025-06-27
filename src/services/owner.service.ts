import axios from "@/lib/axios";

export const getOwnerDashboard = async () => {
  const response = await axios.get("/owner/dashboard");
  return response.data.data;
};

export const getAllOwner = async () => {
  const res = await axios.get("/admin/user/owner");
  return res.data.data;
};
export const getOwnerCurrent = async () => {
  const res = await axios.get("/owner/current");
  return res.data.data;
};
export const uploadProfile = async (formData: FormData) => {
  const res = await axios.post("/owner/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateOwnerProfile = async (payload: {
  name: string;
  phone: string;
}) => {
  const res = await axios.put("/owner/profile", payload);
  return res.data;
};
export const changeOwnerPassword = async (payload: {
  password: string;
  newPassword: string;
}) => {
  const res = await axios.put("/owner/change-password", payload);
  return res.data;
};
