"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { authValidation } from "@/validation/auth.validation";
import { useLogin } from "../hooks/useLogin";
import PasswordInput from "@/components/common/PasswordInput";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [role, setRole] = useState<"tenant" | "owner">("tenant");
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const loginMutation = useLogin();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setFlashMessage(error);
      setTimeout(() => {
        setFlashMessage(null);
        const url = new URL(window.location.href);
        url.searchParams.delete("error");
        router.replace(url.pathname);
      }, 3000);
    }
  }, [searchParams, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(authValidation.loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    loginMutation.mutate(
      { ...data, role },
      {
        onSuccess: () => router.push("/dashboard"),
        onError: (err: any) => {
          setError("email", {
            type: "manual",
            message: err.response?.data?.message || "Login gagal",
          });
        },
      }
    );
  };

  const handleLoginWithGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${role}/google`;
  };

  return (
    <div className="flex justify-center min-h-screen px-4 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setRole("tenant")}
            className={`px-4 py-1 rounded-full border ${
              role === "tenant" ? "bg-blue-100" : ""
            }`}
          >
            Penyewa
          </button>
          <button
            type="button"
            onClick={() => setRole("owner")}
            className={`px-4 py-1 rounded-full border ${
              role === "owner" ? "bg-yellow-100" : ""
            }`}
          >
            Pemilik
          </button>
        </div>

        {flashMessage && (
          <div className="text-red-500 text-sm">{flashMessage}</div>
        )}

        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded"
          />
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <PasswordInput
            register={register("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="text-right">
          <Link
            href={`/auth/forgot-password?role=${role}`}
            className="text-blue-600 text-sm"
          >
            Lupa password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isSubmitting ? "Memproses..." : "Masuk"}
        </button>

        <button
          type="button"
          onClick={handleLoginWithGoogle}
          className="w-full border py-2 rounded mt-4"
        >
          Masuk dengan Google
        </button>

        <p className="text-center text-sm mt-4">
          Belum punya akun?{" "}
          <Link href="/auth/register/tenant" className="text-blue-600">
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
