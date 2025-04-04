"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authValidation } from "@/validation/auth.validation";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";

const ForgotPasswordForm = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { forgotPassword } = useAuth();
  const role = searchParams.get("role");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(authValidation.forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    if (!role) return;
    setLoading(true);
    setMessage(null);

    try {
      await forgotPassword(data.email, role);
      setMessage("Link reset password telah dikirim ke email Anda.");
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Terjadi kesalahan, coba lagi.";
        setError("email", { type: "manual", message: errorMessage });
      } else {
        console.error("Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg ring-2 ring-gray-100 shadow-lg  flex flex-col md:flex-row w-full max-w-5xl h-[500px]">
        <div className="bg-primary rounded-r-[100px]   md:rounded-l-lg  p-8 flex items-center justify-center md:w-1/2">
          <Image
            src="/forgot-password.svg"
            alt="Illustration of a person interacting with a large screen"
            className="w-64 h-64"
            height={100}
            width={100}
          />
        </div>
        <div className="p-8 md:w-1/2 flex mx-10 flex-col justify-center">
          <Link href="/auth/login" className="text-gray-500 mb-4 flex gap-2 ">
            <ArrowLeft /> <span>Kembali</span>
          </Link>
          <h2 className="text-2xl font-semibold mb-4">Lupa Password</h2>
          <p className="text-gray-600 mb-6">
            Masukkan Email yang terdaftar. Kami akan mengirimkan kode verifikasi
            untuk atur ulang kata sandi.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-3 border rounded"
              />
              <p className="text-red-500 text-sm mt-2">
                {errors.email?.message}
              </p>
              {/* Error Message */}

              {/* Notifikasi jika email telah dikirim */}

              <p className="text-green-500 text-sm mb-4 mt-2">
                {message && message}
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary w-full cursor-pointer text-white py-3 rounded"
            >
              {isSubmitting ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
