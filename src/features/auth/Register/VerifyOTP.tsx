"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useOTP } from "@/hooks/useOTP";

const VerifyOTPForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOTP, resendOTP, loading, error } = useOTP(email, "tenant");

  useEffect(() => {
    const storedEmail = localStorage.getItem("otp_email");
    if (!storedEmail) {
      router.replace("/auth/register");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleResendOTP = async () => {
    setIsResendDisabled(true);
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    // setError("");

    try {
      await resendOTP();
      console.log("Mengirim ulang OTP ke:", email);
    } catch (error) {
      console.error("Gagal mengirim ulang OTP:", error);
    }
  };

  // const submitOTP = useCallback(
  //   async (otpCode: string) => {
  //     setLoading(true);
  //     setError("");

  //     try {
  //       console.log("Mengirim OTP:", otpCode);
  //       await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulasi request

  //       if (otpCode !== "123456") throw new Error("Kode OTP salah");

  //       router.push("/dashboard"); // Redirect ke halaman setelah verifikasi
  //     } catch (err: any) {
  //       setError(err.message || "Verifikasi gagal, coba lagi.");
  //       setOtp(["", "", "", "", "", ""]);
  //       inputRefs.current[0]?.focus();
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [router]
  // ); // ✅ Tambahkan router sebagai dependency jika digunakan di dalam fungsi

  // useEffect(() => {
  //   if (otp.every((digit) => digit !== "")) {
  //     submitOTP(otp.join(""));
  //   }
  // }, [otp, submitOTP]); // ✅ Masukkan submitOTP dalam dependencies array

  const handleChange = async (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Hanya angka
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Pindah ke input berikutnya jika ada angka
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Jika sudah 6 digit, otomatis kirim OTP
    if (newOtp.every((digit) => digit !== "")) {
      await verifyOTP(newOtp.join(""));
      localStorage.removeItem("otp_email");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-white rounded-lg ring-2 h-[500px] ring-gray-100 shadow-lg flex flex-col items-center md:flex-row w-full max-w-5xl">
          <div className="p-10 m-4 md:w-1/2">
            <Link
              href="/auth/register"
              className="text-gray-500 mb-4 flex gap-2 "
            >
              <ArrowLeft /> <span>Kembali</span>
            </Link>
            <h2 className="text-2xl font-semibold mb-4">Masukkan Kode OTP</h2>
            <p className="text-gray-600 mb-2">
              Silahkan masukkan 6 digit kode verifikasi yang dikirimkan ke:
            </p>
            <p className="text-black font-semibold mb-6">{email}</p>

            {/* Input OTP */}
            <div className="flex space-x-2 mb-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                />
              ))}
            </div>

            {/* Pesan Error */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Timer Resend OTP */}
            <p className="text-gray-500 text-center mt-4">
              {isResendDisabled ? (
                <>
                  Mohon tunggu <span className="font-semibold">{timer}s</span>{" "}
                  untuk mengirim ulang
                </>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className="text-yellow-500 font-reguler cursor-pointer hover:underline"
                >
                  Kirim ulang OTP
                </button>
              )}
            </p>
          </div>
          <div className="bg-yellow-400 h-full ml-10 rounded-r-lg rounded-l-[150px]  md:w-1/2 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-white text-2xl font-semibold mb-4">
                Verifikasi Akun Anda
              </h2>
              <Image
                src="/authentication.svg"
                alt="Illustration of a person verifying their account on a computer"
                className="mx-auto w-64 h-64"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTPForm;
