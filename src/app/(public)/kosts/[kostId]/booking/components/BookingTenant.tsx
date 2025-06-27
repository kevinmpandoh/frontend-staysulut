// app/(public)/kost/[kostId]/booking/components/BookingClient.tsx

"use client";

import { useState } from "react";
import BookingForm from "./BookingForm";
import BookingSidebar from "./BookingSidebar";
import BookingSuccess from "./BookingSuccess";
import { useKostDetail } from "@/hooks/useKostQuery";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BookingTenantProps {
  kostId: string;
}

export default function BookingTenant({ kostId }: BookingTenantProps) {
  const [success, setSuccess] = useState(false);

  const { data: kost, isLoading, isError, error } = useKostDetail(kostId);

  if (isLoading) return <div>Loading...</div>;

  if (isError || !kost) {
    if ((error as any)?.status === 404) {
      return <div>Kost tidak ditemukan atau sudah dihapus.</div>;
    }

    return <div>Gagal memuat detail kost. Silakan coba lagi nanti.</div>;
  }

  return (
    <>
      {success ? (
        <BookingSuccess />
      ) : (
        <>
          {/* Kiri - Form */}
          <div className="flex-1 space-y-6 mr-8">
            <Link
              href={`/kosts/${kostId}`}
              className="text-blue-600 hover:underline flex items-center mb-4 gap-2"
            >
              <ArrowLeft /> <span>Kembali ke Detail Kost</span>
            </Link>

            <BookingForm kostId={kostId} onSuccess={() => setSuccess(true)} />
          </div>

          {/* Kanan - Sidebar */}
          <div className="w-full md:w-1/3">
            <BookingSidebar
              kost={{
                name: kost?.nama_kost,
                type: kost?.jenis_kost,
                address: `${kost?.alamat.kecamatan}, ${kost?.alamat.kabupaten_kota}`,
                image: kost?.photos[0]?.url,
                price: kost.price,
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
