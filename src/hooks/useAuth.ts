// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: ({
      email,
      password,
      role,
    }: {
      email: string;
      password: string;
      role: string;
    }) => AuthService.login(email, password, role),
    onSuccess: (res, variables) => {
      setUser(res.data);

      queryClient.invalidateQueries({ queryKey: ["me"] });

      if (variables.role === "owner") {
        router.push("/dashboard/owner");
      } else {
        router.push("/");
      }
    },
    onError: (err: unknown) => {
      throw err;
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: (role: string) => AuthService.loginWithGoogle(role),
    onSuccess: (res, role) => {
      setUser(res.data);
      queryClient.invalidateQueries({ queryKey: ["me"] });

      if (role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    },
    onError: (err: unknown) => {
      throw err;
    },
  });

  const { mutate: register, isPending: isRegsiter } = useMutation({
    mutationFn: (data: any) => AuthService.register(data),
    onSuccess: (res: any) => {
      localStorage.setItem("otp_email", res.data.email);

      // Redirect ke halaman OTP
      router.push("/auth/register/verify");
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: { email: string; role: string }) =>
      AuthService.forgotPassword(data.email, data.role),
    onError: (err: unknown) => {
      throw err;
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: { email: string; token: string; role: string }) =>
      AuthService.resetPassword(data.email, data.token, data.role),
    onError: (err: unknown) => {
      throw err;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      setUser(null);
      queryClient.removeQueries(); // optional: hapus semua cache
      router.push("/");
    },
    onError: () => {
      setUser(null);
      router.push("/");
    },
  });

  // Untuk mendapatkan user yang sedang login
  const { data: me, isLoading: isLoadingMe } = useQuery({
    queryKey: ["me"],
    queryFn: AuthService.getUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // cache 5 menit
  });

  return {
    login,
    isLogging,
    loginGoogle: googleLoginMutation.mutate,
    register,
    isRegsiter,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    logout: logoutMutation.mutate,
    isLoadingMe,
    me: me?.data,
  };
}
