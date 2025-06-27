"use client";
import React from "react";
import TableBillingAdmin from "./TableBillingAdmin";

import { useAdminBilling } from "@/hooks/useBillingAdmin";

const BillingAdmin = () => {
  const { billings, loadingBillings } = useAdminBilling();

  if (loadingBillings) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Memuat data penyewa...</span>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Tagihan Sewa</h1>

      <div className="bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center space-y-6">
          <div className="max-w-md w-full">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary focus:border-primary text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-start sm:items-center">
            <div className="w-full items-center flex flex-wrap gap-2">
              <button
                className={`bg-primary border-primary text-white py-1 px-2.5 rounded font-semibold border-2`}
              >
                All
              </button>
              <button
                className={`text-[#5e6c84] py-1 px-2.5 rounded font-semibold border-2`}
              >
                Pending
              </button>
              <button
                className={`text-[#5e6c84] py-1 px-2.5 rounded font-semibold border-2`}
              >
                Success
              </button>
              <button
                className={`text-[#5e6c84] py-1 px-2.5 rounded font-semibold border-2`}
              >
                Completed
              </button>
              <button
                className={`text-[#5e6c84] py-1 px-2.5 rounded font-semibold border-2`}
              >
                Failed
              </button>
            </div>
          </div>
        </div>
        {!billings || billings.length === 0 ? (
          <h1>Tidak ADa</h1>
        ) : (
          <TableBillingAdmin billings={billings} />
        )}
      </div>
    </>
  );
};

export default BillingAdmin;
