"use client";

import { useBooking } from "@/hooks/useBooking";
import { Clipboard, Clock, MapPin, MessageSquareText } from "lucide-react";
import Image from "next/image";
import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const KostSayaPage = () => {
  const {
    activeBooking: data,
    loadingActive,
    checkOut,
    checkingOut,
  } = useBooking();

  if (loadingActive) {
    return (
      <div className="space-y-4">
        <div className="h-28 w-full bg-gray-200 animate-pulse rounded-md" />
        <div className="space-y-3">
          <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded-md" />
        </div>
      </div>
    );
  }

  if (!data || data.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <Image
          src={"/Empty.svg"}
          alt="Empty state illustration"
          width={240}
          height={240}
          className="w-48 h-48 mb-4"
        />
        <p className="text-gray-500 text-lg">Belum ada Kost yang aktif.</p>
        <Link
          href={"/kosts"}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Cari Kost
        </Link>
      </div>
    );
  }

  const handleCheckOut = () => {
    checkOut(data.bookingId);
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6 select-none">
          Kost Saya
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 mb-6">
          <Image
            alt="Room with white bed, yellow curtains, and wooden furniture"
            className="w-40 h-28 rounded-md object-cover mb-4 sm:mb-0"
            height="90"
            src={data.fotoKost || "/default-image.jpg"}
            width="120"
          />
          <div>
            <span className="inline-block bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-md mb-1 select-none">
              {data.jenisKost}
            </span>
            <h2 className="font-bold text-xl text-gray-900 leading-6">
              {data.namaKost}
            </h2>
            <p className="text-sm text-gray-600 mb-1 flex items-center space-x-1">
              <MapPin size={18} />
              <span>{data.alamat}</span>
            </p>
            <a
              className="text-sm font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-700"
              href="#"
            >
              Lihat Detail Kost
            </a>
          </div>
        </div>
        <hr className="my-8" />
      </div>

      {data?.berhentiSewa && (
        <div>
          <h2>Status: {data.berhentiSewa.status}</h2>
          <h3>tanggal Keluar: {data.berhentiSewa.stopDate}</h3>
          <p>Alasan: {data.berhentiSewa.reason}</p>
          {data.berhentiSewa.status === "Disetujui" && (
            <Button disabled={checkingOut} onClick={handleCheckOut}>
              Check Out
            </Button>
          )}
        </div>
      )}

      <div className="">
        <h3 className="font-semibold text-gray-900 mb-4 select-none">
          Aktifitas
        </h3>
        <div className="flex flex-wrap gap-6">
          <Link
            href={"/user/kost-saya/tagihan"}
            className="bg-white rounded-lg border shadow-md p-6 flex flex-col items-center justify-center w-30 h-30 text-gray-700 font-medium select-none hover:shadow-lg transition-all duration-200 ease-in-out hover:bg-blue-50 focus:outline-none"
            type="button"
          >
            <Clock size={38} />
            <span className="text-sm">Tagihan Kost</span>
          </Link>
          <Link
            href={"/user/kost-saya/kontrak"}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center w-32 h-32 text-gray-700 font-semibold select-none hover:shadow-lg transition-all duration-200 ease-in-out hover:bg-blue-50 focus:outline-none"
            type="button"
          >
            <Clipboard />
            Kontrak Kost
          </Link>
          <button
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center w-32 h-32 text-gray-700 font-semibold select-none hover:shadow-lg transition-all duration-200 ease-in-out hover:bg-blue-50 focus:outline-none"
            type="button"
          >
            <MessageSquareText />
            Hubungi Pemilik
          </button>
        </div>
      </div>
    </>
  );
};

export default KostSayaPage;
