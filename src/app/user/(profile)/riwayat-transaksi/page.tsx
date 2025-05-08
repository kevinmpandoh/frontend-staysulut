import React from "react";
import TenantPaymentList from "./TenantPaymentList";

const page = () => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-6">Riwayat Transaksi</h2>

      <TenantPaymentList />
    </>
  );
};

export default page;
