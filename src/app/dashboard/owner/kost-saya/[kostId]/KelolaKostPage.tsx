"use client";
import { Button } from "@/components/ui/button";
import { useKost } from "@/hooks/useKost";
// import { useKost } from "@/hooks/useKost";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import KostTypeCard from "./KostTypeCard";

const KelolaKostPage = ({ kostId }: { kostId: string }) => {
  const { detailKost: kost, loadingDetailKost } = useKost({
    kostId: kostId ?? "",
  });

  if (loadingDetailKost) {
    return <h1>Loading...</h1>;
  }

  if (!kost) {
    return <h1>Kost tidak ditemukan</h1>;
  }

  console.log(kost, "KOST");
  return (
    <>
      <Button type="button" variant={"link"} size={"lg"}>
        <Link
          href={"/dashboard/owner/kost-saya"}
          className="flex items-center gap-1"
        >
          <ArrowLeft /> Kembali
        </Link>
      </Button>
      <h1 className="text-2xl font-bold mb-2">Kost {kost.nama_kost}</h1>
      {/* Alamat */}
      <div className="flex items-center gap-1 text-sm capitalizes mb-4">
        {kost.alamat != "undefined" && (
          <>
            <MapPin size={18} />
            {kost.alamat?.kecamatan}, {kost.alamat?.kabupaten_kota},{" "}
            {kost.alamat?.provinsi}
          </>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full sm:w-[300px] rounded-lg border border-gray-200 bg-gray-100 text-gray-700 text-[14px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
        />

        <Button type="button" size={"lg"}>
          <Link
            href={"/dashboard/kost-type/create?kost_id=" + kostId}
            className="flex items-center gap-1"
          >
            <Plus /> Tambah Tipe Kost
          </Link>
        </Button>
      </div>
      <div className="flex gap-4 overflow-x-auto py-4 items-start">
        {kost.tipe_kost?.map((item: any) => (
          <KostTypeCard key={item.id} kostType={item} kostId={kostId} />
        ))}
      </div>
    </>
  );
};

export default KelolaKostPage;
