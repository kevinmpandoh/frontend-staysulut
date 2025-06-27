// components/user/RentalRequestList.tsx
"use client";

import React from "react";
import RentalRequestCard from "./RentalRequestCard";
import { useBooking } from "@/hooks/useBooking";

const RentalRequestList = () => {
  const { booking, isLoading } = useBooking();

  if (isLoading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!booking || booking.length === 0) {
    return <p className="text-gray-500">Belum ada pengajuan sewa.</p>;
  }

  return (
    <>
      {booking?.map((item: any) => (
        <RentalRequestCard
          key={item?.id}
          id={item?.id}
          date={item?.tanggalDiajukan}
          status={item?.status}
          kostName={item?.namaKost}
          address={item?.alamat}
          category={item?.jenisKost}
          checkInDate={item?.tanggalMasuk}
          duration={item?.durasi}
          imageUrl={item?.fotoKamar}
          price={item?.harga}
          expireDate={item?.expireDate}
          invoice={item?.invoice}
          reason={item?.rejectReason}
        />
      ))}
    </>
  );
};

export default RentalRequestList;
