"use client";

import React from "react";
// import { BillingHistory } from "./BillingHistory";
// import ManageKost from "./ManageKost";
import Chart from "./Chart";
import StatCard from "./StatCard";
import { Calendar, CreditCard, DoorClosed, User } from "lucide-react";

const DashboardAdmin = () => {
  return (
    <>
      <h2 className="font-bold text-xl mb-6">Beranda</h2>
      <section className="flex flex-wrap gap-5 mb-8">
        <StatCard
          icon={Calendar}
          iconBg="bg-brand-600"
          bgColor="from-brand-100"
          title="Total Pengajuan Kost"
          value={100}
        />
        <StatCard
          icon={CreditCard}
          iconBg="bg-amber-400"
          bgColor="from-amber-100"
          title="Total Penyewa"
          value={1200}
        />
        <StatCard
          icon={User}
          iconBg="bg-green-700"
          bgColor="from-green-100"
          title="Total Pemilik Kost"
          value={3}
        />
        <StatCard
          icon={DoorClosed}
          iconBg="bg-sky-400"
          bgColor="from-sky-100"
          title="Total Kost Aktif"
          value={5}
        />
      </section>
      <section className="flex flex-col lg:flex-row gap-6">
        <Chart />
        {/* <ManageKost /> */}
      </section>
      {/* <BillingHistory /> */}
    </>
  );
};

export default DashboardAdmin;
