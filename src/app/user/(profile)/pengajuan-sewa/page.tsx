import RentalRequestList from "@/components/user/RentalRequestList";

import React from "react";

const PengajuanSewaPage = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Pengajuan Sewa Saya
      </h2>

      <RentalRequestList />
    </>
  );
};

export default PengajuanSewaPage;
