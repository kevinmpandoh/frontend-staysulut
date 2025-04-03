"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ForgotPassword = () => {
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
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            onChange={() => {
              console.log("ok");
            }}
            value={"kevinmpandoh@gmail.com"}
            className="w-full p-3 border rounded mb-6"
          />
          <button className="bg-primary text-white py-3 rounded">Masuk</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
