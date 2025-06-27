"use client";

import React from "react";
import { BillingHistory } from "./BillingHistory";
import ManageKost from "./ManageKost";
import Chart from "./Chart";
import StatCard from "./StatCard";
import { Calendar, CreditCard, DoorClosed, User } from "lucide-react";
import { useOwnerDashboard } from "@/hooks/useOwnerDashboard";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardOwner = () => {
  const { data, isLoading, isError } = useOwnerDashboard();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-32 h-8" />
        <div className="flex gap-4 flex-wrap">
          <Skeleton className="w-[200px] h-[100px]" />
          <Skeleton className="w-[200px] h-[100px]" />
          <Skeleton className="w-[200px] h-[100px]" />
          <Skeleton className="w-[200px] h-[100px]" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-red-500">Gagal memuat data dashboard.</div>;
  }

  return (
    <>
      <h2 className="font-bold text-xl mb-6">Beranda</h2>

      <section className="flex flex-wrap gap-5 mb-8">
        <StatCard
          icon={Calendar}
          iconBg="bg-brand-600"
          bgColor="from-brand-100"
          title="Total Pengajuan"
          value={data.total_pengajuan}
        />
        <StatCard
          icon={CreditCard}
          iconBg="bg-amber-400"
          bgColor="from-amber-100"
          title="Total Belum Bayar"
          value={data.belum_bayar}
        />
        <StatCard
          icon={User}
          iconBg="bg-green-700"
          bgColor="from-green-100"
          title="Total Penyewa"
          value={data.total_penyewa}
        />
        <StatCard
          icon={DoorClosed}
          iconBg="bg-sky-400"
          bgColor="from-sky-100"
          title="Total Kamar"
          value={data.kamar.total_kamar}
        />
      </section>

      <section className="flex flex-col lg:flex-row gap-6">
        <Chart data={data.pendapatanPerBulan} />
        <ManageKost
          jumlahPengajuanSewa={data.jumlah_pengajuan_sewa}
          jumlahPengajuanBerhenti={data.jumlah_pengajuan_berhenti}
          jumlahTagihanBelumDibayar={data.tagihanBelumDibayar.length}
        />
      </section>

      <BillingHistory data={data?.tagihanBelumDibayar} />
    </>
  );
};

export default DashboardOwner;
