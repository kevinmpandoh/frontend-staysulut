"use client";

import { useBilling } from "@/hooks/useBilling";
import React from "react";
import BillingCard from "./BillingCard";

type Props = {
  bookingId: string;
  status: "paid" | "unpaid";
};

const BillingList: React.FC<Props> = ({ bookingId, status }) => {
  const { billings, loadingBillings } = useBilling({ bookingId });

  if (loadingBillings)
    return <p className="text-sm text-gray-500">Memuat data...</p>;
  //   if (isError)
  //     return <p className="text-sm text-red-500">Gagal memuat data.</p>;

  const filteredBillings =
    billings?.filter((item: any) =>
      status === "paid" ? item.status === "paid" : item.status !== "paid"
    ) || [];

  if (filteredBillings.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 h-[400px] w-full flex items-center justify-center ">
        {status === "paid"
          ? "Belum ada tagihan yang sudah dibayar."
          : "Belum ada tagihan yang harus dibayar."}
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {filteredBillings.map((item: any) => (
        <BillingCard key={item.id} billing={item} />
      ))}
    </div>
  );
};

export default BillingList;
