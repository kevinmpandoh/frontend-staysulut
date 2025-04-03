"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginAdminPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white h-[500px] rounded-lg ring-2 ring-gray-100 shadow-lg flex max-w-5xl w-full">
          <div className="bg-primary-2 text-white p-10 rounded-l-lg rounded-r-[200px] flex flex-col items-center justify-center w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Selamat Datang</h2>
            <Image
              src="/Login-amico.svg"
              alt="Illustration of a person holding a key in front of a computer screen"
              className="w-64 h-64"
              width={300}
              height={300}
              priority
              //   aria-readonly
            />
          </div>
          <div className="p-10 w-1/2 mx-10 flex flex-col justify-center">
            <h2 className="text-2xl text-center font-semibold mb-6">Login</h2>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Nomor Handphone*</label>
                <input
                  type="text"
                  value="089510465800"
                  className="w-full px-4 py-2 border rounded-lg mt-2"
                  onChange={() => console.log("OK")}
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700">Kata Sandi</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full px-4 py-2 border rounded-lg mt-2"
                  onChange={() => console.log("OK")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 mt-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg mb-4"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdminPage;
