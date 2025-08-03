"use client";
import { usePayment } from "@/hooks/usePayment";
import Image from "next/image";
import React, { useState } from "react";

import { PAYMENT_METHOD } from "@/constants/paymentMethod";
import { PaymentDetailModal } from "./PaymentDetailModal";

export function findPaymentMethod(methodValue: string) {
  for (const category of PAYMENT_METHOD) {
    const method = category.methods.find((m) => m.value === methodValue);
    if (method) return method;
  }
  return null;
}

const TenantPaymentList = () => {
  const { tenantPayment, isLoading } = usePayment({});
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (!tenantPayment) {
    return <h1>Payment Tidak Ada</h1>;
  }
  return (
    <div className="space-y-4">
      {tenantPayment.map((data: any) => {
        const method = findPaymentMethod(data.payment_method);
        return (
          <div key={data.id} className="bg-white rounded-lg p-5 border">
            <div className="flex justify-between items-start mb-4 text-sm text-gray-600 font-normal">
              <span>
                {data.payment_date} | {data.invoice}
              </span>
              <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-2 py-0.5 rounded-full select-none">
                {data.status}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 rounded-md p-4">
              <div className="flex-1 border-r border-gray-200 pr-4 mb-4 sm:mb-0">
                <p className="font-semibold text-lg text-gray-900">
                  {data.kost}
                </p>
                <p className="text-md text-gray-500 mt-1">
                  Pembayaran bulan ke - {data.month_number}
                </p>
              </div>
              <div className="flex-1 border-r border-gray-200 px-4 mb-4 sm:mb-0">
                <p className="font-semibold text-lg text-gray-900">
                  Metode Pembayaran
                </p>
                <div className="text-md text-gray-500 mt-1 flex items-center space-x-1">
                  {method ? (
                    <>
                      <Image
                        src={method.logo}
                        alt={method.name}
                        width={30}
                        height={30}
                      />
                      <span>{method.name}</span>
                    </>
                  ) : (
                    <span>{data.payment_method}</span>
                  )}
                </div>
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
                className="mt-3 text-base font-semibold text-blue-600 border border-blue-600 rounded px-3 py-1 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => {
                  setSelectedPayment({
                    ...data,
                    methodName: method?.name,
                  });
                  setOpenDetailModal(true);
                }}
              >
                Lihat Selengkapnya
              </button>
            </div>
          </div>
        );
      })}
      <PaymentDetailModal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        payment={selectedPayment}
      />
    </div>
  );
};

export default TenantPaymentList;
