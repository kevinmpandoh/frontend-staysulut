"use client";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { authValidation } from "@/validation/auth.validation";

const RegisterForm = () => {
  const [role, setRole] = useState<"tenant" | "owner">("tenant");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser } = useAuth(); // Hook untuk registrasi
  const router = useRouter();

  // ✅ React Hook Form dengan Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // ✅ Tambahkan setError
  } = useForm({
    resolver: yupResolver(authValidation.registerSchema),
    mode: "onChange",
  });

  // ✅ Fungsi Submit
  const onSubmit = async (data: any) => {
    try {
      await registerUser({ ...data, role });

      localStorage.setItem("otp_email", data.email);

      // Redirect ke halaman OTP
      router.push("/auth/register/verify");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.status);
        const errorMessage =
          error.response?.data?.errors.email || "Terjadi kesalahan, coba lagi.";
        setError("email", { type: "manual", message: errorMessage });
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg ring-2 ring-gray-100 shadow-lg flex max-w-5xl w-full">
          <div className="w-1/2 p-4 mx-10 ">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Mendaftar
            </h2>
            <div className="flex space-x-4 mb-6 justify-center">
              <div className="border-2 rounded-lg flex">
                <button
                  type="button"
                  onClick={() => setRole("tenant")}
                  className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                    role === "tenant" && "bg-indigo-50"
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
                  className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                    role === "owner" && "bg-indigo-50"
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700">Nama Lengkap</label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nomor Handphone</label>
                <input
                  type="text"
                  {...register("phone")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700">Kata Sandi</label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-6 relative">
                <label className="block text-gray-700">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                Daftar
              </button>
            </form>
            <p className="text-center text-gray-500 my-6">
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="text-yellow-500">
                Masuk Sekarang
              </Link>
            </p>
          </div>
          <div className="w-1/2 bg-yellow-400 rounded-r-lg rounded-l-[200px] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-white text-2xl font-semibold mb-4">
                Silahkan Mendaftar
              </h2>
              <Image
                src="/Sign up-amico.svg"
                alt="Illustration of a person signing up on a website"
                className="mx-auto"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
