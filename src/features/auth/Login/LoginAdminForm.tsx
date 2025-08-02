"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authValidation } from "@/validation/auth.validation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

type FormValues = {
  email: string;
  password: string;
};

const LoginAdminForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(authValidation.loginSchema),
  });

  const loginMutation = useAdminLogin();

  const onSubmit = (data: FormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        setUser(res.data);
        queryClient.invalidateQueries({ queryKey: ["me"] });

        router.push("/dashboard/admin");

        // simpan token, redirect, dsb
      },
      onError: (err: any) => {
        console.error("Login gagal:", err?.response?.data || err.message);
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white h-[500px] rounded-lg ring-2 ring-gray-100 shadow-lg flex max-w-5xl w-full">
        <div className="bg-primary-2 text-white p-10 rounded-l-lg rounded-r-[200px] flex flex-col items-center justify-center w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Selamat Datang</h2>
          <Image
            src="/Login-amico.svg"
            alt="Login Illustration"
            className="w-64 h-64"
            width={300}
            height={300}
            priority
          />
        </div>
        <div className="p-10 w-1/2 mx-10 flex flex-col justify-center">
          <h2 className="text-2xl text-center font-semibold mb-6">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="text"
                {...register("email")}
                placeholder="Masukkan Emial Anda"
                className={`w-full px-4 py-2 border rounded-lg mt-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700">Kata Sandi*</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="********"
                className={`w-full px-4 py-2 border rounded-lg mt-2 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 mt-2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loginMutation.isPending ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdminForm;
