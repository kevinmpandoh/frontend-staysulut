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
      console.log(user, "USERR");
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
      console.log(user, "USERR");
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

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      router.push("/auth");
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message || "Logout gagal");
      }
      throw new Error("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  return { login, register, logout, loginWithGoogle };
}
