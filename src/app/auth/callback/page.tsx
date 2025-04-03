"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { AxiosError } from "axios";

const CallbackPage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Mengambil data user dari backend
        const response = await AuthService.getUser();

        if (!response.data) {
          router.push("/auth/login");
          return;
        }

        // Update state dengan data user
        setUser(response.data);
        console.log("User data set in store:", response.data);

        // Periksa role dan lakukan redirect berdasarkan role
        if (response.data.role === "owner") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Login gagal", error);
        if (error instanceof AxiosError) {
          // Tampilkan pesan error bahwa email sudah digunakan
          alert("Email sudah digunakan untuk akun lain dengan role berbeda.");
        } else {
          // Redirect ke halaman login jika terjadi error lainnya
          alert("Terjadi keasalahan sialhkan coba lagi.");
          router.push("/auth/login"); // Jika gagal, kembali ke login
        }
      }
    };

    fetchUser();
  }, [router, setUser]);

  return <p>Logging in...</p>;
};

export default CallbackPage;
