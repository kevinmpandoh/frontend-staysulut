import { useAuthStore } from "@/stores/auth.store";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export function useAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const login = async (email: string, password: string, role: string) => {
    try {
      const user = await AuthService.login(email, password, role);
      setUser(user.data);
      if (role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        // Langsung lempar error dari Axios agar bisa ditangkap di frontend
        throw err;
      }
      throw new Error("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  const loginWithGoogle = async (role: string) => {
    try {
      const user = await AuthService.loginWithGoogle(role);
      setUser(user.data);
      if (role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        // Langsung lempar error dari Axios agar bisa ditangkap di frontend
        throw err;
      }
      throw new Error("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  const register = async (data: any) => {
    try {
      await AuthService.register(data);

      router.push("/auth/register/verify");
    } catch (err) {
      if (err instanceof AxiosError) {
        // Langsung lempar error dari Axios agar bisa ditangkap di frontend
        throw err;
      }
      throw new Error("Terjadi kesalahan, silakan coba lagi.");
    }
  };
  const registerTenant = async (data: any) => {
    try {
      await AuthService.register(data);

      router.push("/auth/register/verify");
    } catch (err) {
      if (err instanceof AxiosError) {
        // Langsung lempar error dari Axios agar bisa ditangkap di frontend
        throw err;
      }
      throw new Error("Terjadi kesalahan, silakan coba lagi.");
    }
  };
  const forgotPassword = async (email: string, role: string) => {
    try {
      return await AuthService.forgotPassword(email, role);
    } catch (err) {
      if (err instanceof AxiosError) {
        // Langsung lempar error dari Axios agar bisa ditangkap di frontend
        throw err;
      }
      throw new Error("Terjadi kesalahan, silakan coba lagi.");
    }
  };
  const resetPassword = async (email: string, token: string, role: string) => {
    try {
      return await AuthService.resetPassword(email, token, role);
    } catch (err) {
      if (err instanceof AxiosError) {
        // Langsung lempar error dari Axios agar bisa ditangkap di frontend
        throw err;
      }
      throw new Error("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout(); // kalau tidak ada endpoint logout, bisa dihapus
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      router.push("/"); // reload page setelah logout
    }
  };
  const isLoggedIn = async () => {
    try {
      const user = await AuthService.getUser();
      setUser(user?.data);

      return user;
    } catch (err) {
      if (err instanceof AxiosError) {
        // Langsung lempar error dari Axios agar bisa ditangkap di frontend
        throw err;
      }
      logout(); // auto logout kalau token invalid
    }
  };

  return {
    login,
    register,
    registerTenant,
    logout,
    loginWithGoogle,
    forgotPassword,
    resetPassword,
    isLoggedIn,
  };
}
