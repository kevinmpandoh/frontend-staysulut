import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PengajuanSewaList from "@/components/dashboard/pengajuan-sewa/PengajuanSewaList";

import React from "react";

const PengajuanSewaPage = () => {
  return (
    <>
      <PageBreadcrumb pageTitle={"Pengajuan Sewa"} />

      <PengajuanSewaList />
    </>
  );
};

export default PengajuanSewaPage;
