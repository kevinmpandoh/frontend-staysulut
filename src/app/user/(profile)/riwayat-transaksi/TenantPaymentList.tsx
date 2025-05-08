"use client";
import { usePayment } from "@/hooks/usePayment";
import Image from "next/image";
import React from "react";

const TenantPaymentList = () => {
  const { tenantPayment, isLoading } = usePayment();

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (!tenantPayment) {
    return <h1>Payment Tidak Ada</h1>;
  }
  return (
    <>
      {tenantPayment.map((data: any) => (
        <div key={data.id} className="bg-white rounded-lg shadow-md p-5 border">
          <div className="flex justify-between items-start mb-4 text-sm text-gray-600 font-normal">
            <span>
              {data.payment_date} | {data.invoice}
            </span>
            {/* <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-2 py-0.5 rounded-full select-none">
            Diluar Mami Kost
          </span> */}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 rounded-md p-4">
            <div className="flex-1 border-r border-gray-200 pr-4 mb-4 sm:mb-0">
              <p className="font-semibold text-lg text-gray-900">{data.kost}</p>
              <p className="text-md text-gray-500 mt-1">
                Pembayaran bulan ke-1
              </p>
            </div>
            <div className="flex-1 border-r border-gray-200 px-4 mb-4 sm:mb-0">
              <p className="font-semibold text-lg text-gray-900">
                Metode Pembayaran
              </p>
              <p className="text-md text-gray-500 mt-1 flex items-center space-x-1">
                <span>{data.payment_method}</span>
                <Image
                  src="/logos/bank/bni.png"
                  alt="BNI bank logo in orange color"
                  className="inline-block"
                  width={30}
                  height={30}
                />
              </p>
            </div>
            <div className="flex-1 px-4">
              <p className="font-semibold text-md text-gray-900">
                Total Pembayaran
              </p>
              <p className="font-bold text-base mt-1">
                Rp {data.amount?.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mt-3 text-sm font-semibold text-blue-600 border border-blue-600 rounded px-3 py-1 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Lihat Selengkapnya
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default TenantPaymentList;
