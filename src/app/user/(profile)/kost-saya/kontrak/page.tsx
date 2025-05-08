"use client";
import { useBooking } from "@/hooks/useBooking";
import Image from "next/image";
import React from "react";

const KontrakPage = () => {
  const { stopBooking, stopingBooking } = useBooking();
  const id = "68156aa53dfdc91d443ecbfd";

  const handleStopBooking = () => {
    if (id) {
      stopBooking({
        id,
        data: { reason: "Pindah kost", stopDate: "2025-07-03" },
      });
    }
  };
  return (
    <div>
      <div className="w-full mx-auto">
        <a
          className="inline-flex items-center text-gray-800 font-semibold mb-6 hover:underline"
          href="#"
        >
          Kembali
        </a>
        <h1 className="text-2xl font-bold mb-6">Kontrak Kost</h1>
        <div className="flex space-x-4 mb-6">
          <Image
            alt="Room with white bed, purple pillows, yellow curtain, and wooden dresser"
            className="w-30 h-22 rounded-lg object-cover flex-shrink-0"
            height="90"
            src="/kost.jpg"
            width="120"
          />
          <div className="flex flex-col justify-start">
            <span className="text-xs font-semibold text-white bg-blue-300 rounded px-2 py-0.5 mb-1 w-max select-none">
              Kost Campur
            </span>
            <h2 className="font-bold text-lg leading-tight">Kost Vinshi</h2>
            <div className="flex items-center text-gray-600 text-sm mt-1 space-x-1">
              <span>Remboken, Minahasa</span>
            </div>
            <a
              className="mt-2 text-sm font-semibold text-gray-800 underline hover:text-gray-900"
              href="#"
            >
              Lihat Detail Kost
            </a>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold text-sm">Total Biaya Sewa</p>
            <p className="mt-1 text-base font-normal">Rp 700.000</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-sm">Tanggal Penagihan</p>
            <p className="mt-1 text-base font-normal">1 Desember 2025</p>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-base">
            <span>Mulai Sewa</span>
            <span className="font-semibold">1 Desember 2024</span>
          </div>
          <div className="flex justify-between text-base">
            <span>Durasi Sewa</span>
            <span className="font-semibold">2 Bulan</span>
          </div>
          <div className="flex justify-between text-base">
            <span>Sewa Berakhir</span>
            <span className="font-semibold">1 Februari 2025</span>
          </div>
        </div>
        <button
          onClick={handleStopBooking}
          disabled={stopingBooking}
          className="w-full border border-gray-300 rounded-md py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="button"
        >
          {stopingBooking ? "Memproses..." : "Ajukan Berhenti Sewa"}
        </button>
      </div>
    </div>
  );
};

export default KontrakPage;
