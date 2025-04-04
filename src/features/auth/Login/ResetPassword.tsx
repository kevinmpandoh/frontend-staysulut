"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authValidation } from "@/validation/auth.validation";
import { AxiosError } from "axios";
import { AuthService } from "@/services/auth.service";
import Image from "next/image";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const role = searchParams.get("role");

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token && !role) {
      router.push("/auth/login");
    }
  }, [token, router, role]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(authValidation.resetPasswordSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: any) => {
    if (!token || !role) {
      setError("password", { type: "manual", message: "Token tidak valid." });
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      await AuthService.resetPassword(data.password, token, role);
      setMessage("Password berhasil diubah! Silakan login.");
      reset();
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error, "ERROR");
        const errorMessage =
          error.response?.data?.message || "Terjadi kesalahan, coba lagi.";
        setError("password", { type: "manual", message: errorMessage });
      } else {
        console.error("Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg h-[500px] ring-2 ring-gray-100 shadow-lg  flex flex-col md:flex-row items-center md:items-start w-full max-w-5xl mx-auto">
        <div className="bg-primary h-full  rounded-lg rounded-r-[150px] p-8 flex items-center justify-center md:w-1/2">
          <Image
            src="/reset-password.svg"
            alt="Illustration of password reset process"
            className="w-64 h-64"
            width={100}
            height={100}
          />
        </div>
        <div className="p-8 mx-8 md:w-1/2 h-full flex justify-center flex-col">
          <h2 className="text-2xl font-bold mb-4">Ganti Password</h2>
          <p className="text-gray-600 mb-6">
            Masukkan kata sandi baru untuk mengubahnya
          </p>
          {/* Notifikasi jika password berhasil diubah */}
          {message && (
            <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Kata Sandi Baru
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded text-white ${
                loading ? "bg-gray-300 cursor-not-allowed" : "bg-primary"
              }`}
            >
              {loading ? "Mengubah..." : "Ubah Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
