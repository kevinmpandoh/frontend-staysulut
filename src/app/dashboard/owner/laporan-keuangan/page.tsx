"use client";

import React from "react";

import { Calendar, CreditCard, DoorClosed, User } from "lucide-react";
import StatCard from "../StatCard";
import { Transaction } from "./Transaction";

const LaporanKeuanganPage = () => {
  return (
    <>
      <h2 className="font-bold text-xl mb-6">Beranda</h2>
      <section className="flex flex-wrap gap-5 mb-8">
        <StatCard
          icon={Calendar}
          iconBg="bg-brand-600"
          bgColor="from-brand-100"
          title="Total Pendapatan"
          value={100}
        />
        <StatCard
          icon={DoorClosed}
          iconBg="bg-sky-400"
          bgColor="from-sky-100"
          title="Belum Bayar"
          value={5}
        />
        <StatCard
          icon={CreditCard}
          iconBg="bg-amber-400"
          bgColor="from-amber-100"
          title="Diterima dari aplikasi"
          value={1200}
        />
        <StatCard
          icon={User}
          iconBg="bg-green-700"
          bgColor="from-green-100"
          title="Diterima dari penyewa"
          value={3}
        />
      </section>
      <section className="flex flex-col lg:flex-row gap-6">
        {/* <StatisticsChart /> */}
      </section>
      <Transaction />
    </>
  );
};

export default LaporanKeuanganPage;
