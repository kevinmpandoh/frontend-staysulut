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
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Autoplay } from "@/utils/kennAutoPlay";

const features = [
  {
    image: "/kost2.png",
    title: "Temukan Kost Idaman",
    description:
      "Jelajahi berbagai pilihan kost sesuai preferensimu dengan mudah.",
  },
  {
    image: "/kost2.png",
    title: "Transaksi Aman",
    description:
      "Pembayaran dan proses sewa dilakukan dengan aman dan transparan.",
  },
  {
    image: "/kost2.png",
    title: "Chat Langsung",
    description: "Hubungi pemilik kost langsung melalui aplikasi.",
  },
];

const RegisterTenantForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerTenant } = useAuth(); // Hook untuk registrasi
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel); // update current slide index
      },
      created() {
        setLoaded(true);
      },
    },
    [Autoplay(3000)]
  );

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
      await registerTenant(data);

      localStorage.setItem("otp_email", data.email);

      // Redirect ke halaman OTP
      router.push("/auth/register/verify");
    } catch (error) {
      if (error instanceof AxiosError) {
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200">
        <div className="flex max-w-6xl w-full">
          <div className="w-full lg:w-1/2 ">
            <div className="p-10 mx-20 lg:mx-0 px-10 lg:px-20 shadow-lg bg-white ring-gray-100 ">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Mendaftar
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700">Nama Lengkap</label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/80 transition duration-300"
                >
                  Daftar
                </button>
              </form>
              <p className="text-center text-gray-500 my-6">
                Sudah punya akun?{" "}
                <Link href="/auth/login" className="text-primary">
                  Masuk Sekarang
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden space-y-6 bg-white shadow-lg lg:flex w-1/2  text-gray-600 p-10 flex-col items-center justify-center transition-all duration-500 bg-gradient-to-br from-[#101133] to-[#181B4B] ">
            <div>Logo</div>
            <div
              ref={sliderRef}
              className={`keen-slider w-full transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            >
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="keen-slider__slide flex flex-col items-center justify-center text-white px-6"
                >
                  <div className="w-64 flex flex-col items-center space-y-4">
                    <Image
                      src={feature.image}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover border-2 border-gray-300 rounded-lg"
                      alt="feature"
                    />

                    <h2 className="mt-6 text-2xl text-white text-center font-semibold">
                      {feature.title}
                    </h2>
                    <p className="text-sm text-slate-400 text-center mt-2 leading-6 ">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {loaded && (
              <div className="flex justify-center gap-2 mt-4">
                {features.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-0.5 w-8 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterTenantForm;
