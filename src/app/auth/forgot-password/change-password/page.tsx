import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg h-[500px] ring-2 ring-gray-100 shadow-lg  flex flex-col md:flex-row items-center md:items-start w-full max-w-5xl mx-auto">
        <div className="bg-blue-600 h-full  rounded-lg rounded-r-[150px] p-8 flex items-center justify-center md:w-1/2">
          <Image
            src="/reset-password.svg"
            alt="Illustration of password reset process"
            className="w-64 h-64"
            width={100}
            height={100}
          />
        </div>
        <div className="p-8 mx-8 md:w-1/2 h-full flex justify-center flex-col">
          <h2 className="text-2xl font-bold mb-4">Ganti Password</h2>
          <p className="text-gray-600 mb-6">
            Masukkan kata sandi baru untuk mengubahnya
          </p>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="new-password"
              >
                Kata Sandi Baru <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="new-password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="confirm-password"
              >
                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
