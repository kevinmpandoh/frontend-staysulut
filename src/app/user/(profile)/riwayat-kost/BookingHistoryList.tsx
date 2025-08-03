"use client";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/hooks/useBooking";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookingHistoryList = () => {
  const { bookingHistory, loadingHistory } = useBooking();

  if (loadingHistory) {
    return <h1>Loading...</h1>;
  }

  if (!bookingHistory || bookingHistory.length === 0) {
    return "Belum Ada";
  }

  return (
    <>
      <div className="space-y-6">
        {bookingHistory.map((data: any) => (
          <div
            key={data.id}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full"
          >
            <Link href={`/kosts/${data.kostTypeId}`}>
              <Image
                src={data.fotoKamar || "/kost.jpg"}
                width={120}
                height={90}
                alt="Room with bed and wooden door, bright yellow wall"
                className="w-40 h-36 rounded-md object-cover flex-shrink-0"
              />
            </Link>
            <div className="flex flex-col sm:ml-4 mt-3 sm:mt-0 w-full">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 font-normal">
                  12 Juli 2024 - 12 Agustus 2024 | 3 Bulan
                </span>
                <span className="text-sm text-green-600 border border-green-200 rounded-full px-2 py-0.5 font-semibold select-none">
                  Selesai
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs text-blue-600 bg-blue-100 border border-blue-200 rounded px-2 py-0.5 font-semibold select-none">
                  {data.jenisKost}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {data.namaKost}
              </h3>
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                {data.alamat}
              </div>
              <div className="mt-3 self-end">
                <Button>
                  <Link href={`/kosts/${data.kostTypeId}/booking`}>
                    Sewa Lagi
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingHistoryList;
