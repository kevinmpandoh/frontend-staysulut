import { useState, useCallback } from "react";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export function useOTP(email: string, role: "tenant" | "owner") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const verifyOTP = useCallback(
    async (otp: string) => {
      setLoading(true);
      setError("");

      try {
        const user = await AuthService.verifyOTP(email, otp, role);
        setUser(user); // Simpan user di store
        if (role === "owner") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [email, role, router, setUser]
  );

  const resendOTP = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      await AuthService.resendOTP(email, role);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [email, role]);

  return { verifyOTP, resendOTP, loading, error };
}
