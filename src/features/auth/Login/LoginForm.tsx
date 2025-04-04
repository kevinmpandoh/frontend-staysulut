"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { authValidation } from "@/validation/auth.validation";

const LoginForm = () => {
  const [role, setRole] = useState<"tenant" | "owner">("tenant");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError, // ✅ Tambahkan setError
  } = useForm({
    resolver: yupResolver(authValidation.loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password, role);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Terjadi kesalahan, coba lagi.";
        setError("email", { type: "manual", message: errorMessage });
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      // await loginWithGoogle(role);
      window.location.href = `http://localhost:8000/api/auth/${role}/google`;
    } catch (error) {
      console.log(error, "ERRORR");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg ring-2 ring-gray-100 shadow-lg flex max-w-5xl w-full">
          {/* ====== BAGIAN KIRI (ANIMASI) ====== */}
          <motion.div
            key={role}
            initial={{ opacity: 0.5, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`${
              role === "tenant" ? "bg-primary" : "bg-yellow-500"
            } text-white p-10 rounded-l-lg rounded-r-[200px] flex flex-col items-center justify-center w-1/2`}
          >
            <h2 className="text-2xl font-semibold mb-4">Selamat Datang</h2>
            <Image
              src="/Login-amico.svg"
              alt="Illustration of a person holding a key in front of a computer screen"
              className="w-64 h-64"
              width={300}
              height={300}
            />
          </motion.div>

          {/* ====== BAGIAN KANAN (FORM) ====== */}
          <div className="p-10 w-1/2 mx-10">
            <h2 className="text-2xl text-center font-semibold mb-6">Login</h2>

            {/* ✅ Tab Role Penyewa / Pemilik */}
            <div className="flex space-x-4 mb-6 justify-center">
              <div className="border-2 rounded-lg flex">
                <button
                  type="button"
                  onClick={() => setRole("tenant")}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-50  ${
                    role === "tenant" && "bg-indigo-50 hover:bg-indigo-100"
                  }  rounded-l-lg `}
                >
                  <span
                    className={` text-slate-800   ${
                      role === "tenant" && "text-indigo-900 "
                    } font-semibold `}
                  >
                    Penyewa Kost
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("owner")}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                    role === "owner" && "bg-yellow-50 hover:bg-yellow-100"
                  }  rounded-r-lg `}
                >
                  <span
                    className={` text-slate-800  ${
                      role === "owner" && "text-indigo-900 "
                    } font-semibold`}
                  >
                    Pemilik Kost
                  </span>
                </button>
              </div>
            </div>
            {/* ✅ Form Login */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg mt-2 outline-none transition-all ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                <p className="text-red-500 text-sm min-h-[20px]">
                  {errors.email?.message}
                </p>
              </div>

              <div className="mb-4 relative">
                <label className="block text-gray-700">Kata Sandi</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-2 border rounded-lg mt-2 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 mt-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <p className="text-red-500 text-sm min-h-[20px]">
                  {errors.password?.message}
                </p>
              </div>
              <div className="text-right mb-4">
                <Link
                  href={`/auth/forgot-password?role=${role}`}
                  className="text-blue-600"
                >
                  Lupa Password?
                </Link>
              </div>
              {/* Tombol Login */}
              <button
                type="submit"
                className={`w-full text-white py-2 rounded-lg font-semibold transition-all ${
                  role === "owner"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-primary hover:bg-blue-600"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Masuk"}
              </button>
            </form>
            <div className="flex items-center mb-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-4 text-gray-500">atau</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button
              onClick={handleLoginWithGoogle}
              className="w-full border cursor-pointer border-gray-300 py-2 rounded-lg flex gap-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Masuk dengan Google
            </button>
            <div className="text-center mt-4">
              <span className="text-gray-500">
                Belum punya akun?{" "}
                <Link href="/auth/register" className="text-primary">
                  Daftar Sekarang
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
