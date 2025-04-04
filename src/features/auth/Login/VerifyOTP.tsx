"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const VerifyOTPLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg ring-2 h-[500px] ring-gray-100  shadow-lg flex flex-col md:flex-row items-center md:items-start w-full max-w-5xl mx-auto">
        <div className="md:w-1/2 bg-blue-600 rounded-lg rounded-r-[100px] p-6 md:p-10 flex h-full items-center justify-center">
          <Image
            src="/authentication-2.svg"
            alt="Illustration of a person entering OTP on a laptop"
            className="w-64 h-64"
            width={100}
            height={100}
          />
        </div>
        <div className=" md:w-1/2 md:ml-4 mt-6 p-10 md:mt-0 text-center h-full md:text-left">
          <Link href="/auth/login" className="text-gray-500 mb-4 flex gap-2 ">
            <ArrowLeft /> <span>Kembali</span>
          </Link>
          <h2 className="text-2xl font-semibold mb-4">Masukkan Kode OTP</h2>
          <p className="text-gray-600 mb-4">
            Silahkan masukkan 6 digit kode verifikasi yang dikirimkan ke:
          </p>
          <p className="text-gray-800 font-semibold mb-6">
            kevinmpandoh@gmail.com
          </p>
          <div className="flex justify-center md:justify-start space-x-2 mb-6">
            <input
              type="text"
              maxLength={1}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
            />
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Mohon tunggu 59 detik untuk mengirim ulang
          </p>
          <button className="bg-blue-600 w-full text-white px-6 py-3 rounded-lg">
            Verifikasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPLogin;
