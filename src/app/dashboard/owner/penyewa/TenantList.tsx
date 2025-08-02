"use client";
import { Button } from "@/components/ui/button";
import { useBookingOwner } from "@/hooks/useBookingOwner";
import React from "react";
import TenantCard from "./TenantCard";

const TenantList = () => {
  const { activeBooking, loadingActive } = useBookingOwner({ status: "all" });

  if (loadingActive) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Memuat data penyewa...</span>
      </div>
    );
  }

  if (!activeBooking || activeBooking.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Tidak ada penyewa aktif saat ini.</span>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div className="max-w-md w-full">
          <input
            type="text"
            placeholder="Cari..."
            className="w-full px-4 py-3 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary focus:border-primary text-gray-700 placeholder-gray-400"
          />
        </div>
        <Button size={"lg"}>Tambah Penyewa</Button>
      </div>

      {activeBooking.map((booking: any, index: number) => (
        <TenantCard key={index} booking={booking} />
      ))}
    </>
  );
};

export default TenantList;
