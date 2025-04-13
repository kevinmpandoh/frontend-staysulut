import api from "@/lib/axios";

type AuthResponse = {
  data: {
    id: string;
    name: string;
    email: string;
    role: "penyewa" | "pemilik";
  };
};

export const AuthService = {
  login: async (email: string, password: string, role: string) => {
    const response = await api.post<AuthResponse>(`/auth/${role}/login`, {
      email,
      password,
    });
    return response.data;
  },
  loginWithGoogle: async (role: string) => {
    const response = await api.get(`/auth/${role}/google`);
    return response.data;
  },

  register: async (data: any) => {
    const response = await api.post<AuthResponse>(
      `/auth/${data.role}/register`,
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }
    );
    return response.data;
  },
  forgotPassword: async (email: string, role: string) => {
    const response = await api.post<AuthResponse>(
      `/auth/${role}/forgot-password`,
      {
        email,
      }
    );
    return response.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },
  getUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  async verifyOTP(email: string, otp: string, role: "tenant" | "owner") {
    try {
      const response = await api.post(`/auth/${role}/verify-otp`, {
        email,
        otp,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Verifikasi OTP gagal. Silahkan Coba lagi."
      );
    }
  },

  async resendOTP(email: string, role: "tenant" | "owner") {
    try {
      const response = await api.post(`/auth/${role}/resend-otp`, {
        email,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Gagal mengirim ulang OTP. Silahkan coba lagi"
      );
    }
  },
  async resetPassword(newPassword: string, token: string, role: string) {
    try {
      const response = await api.post(`/auth/${role}/reset-password`, {
        password: newPassword,
        token,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
