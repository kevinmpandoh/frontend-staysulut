"use client";
import React from "react";
import { useKostList } from "@/hooks/kost/useKostList";
import KostCard from "@/components/CardListKost";
import KostCardSkeleton from "@/components/Skeleton/CardListKostSkeleton";
import EmptyState from "@/components/Empty/EmptyState";
import ErrorState from "@/components/Error/ErrorState";
import KostPagination from "@/components/KostPagination";

const KostList = () => {
  const { data, isLoading, isError } = useKostList();
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <KostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6  h-[300px] flex justify-center items-center">
        <ErrorState message="Gagal memuat data kost. Silakan coba lagi nanti." />
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="mt-6 h-[300px] flex justify-center items-center">
        <EmptyState message="Tidak ada kost yang ditemukan." />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.data?.map((kost: any) => (
          <KostCard
            key={kost.id}
            title={kost.nama_kost}
            location={kost.alamat}
            type={kost.jenis_kost}
            price={kost.harga_perbulan}
            images={kost.foto}
            facilities={kost.fasilitas}
          />
        ))}
      </div>

      {data && (
        <div className="max-w-xl mx-auto mt-10 mb-24">
          <KostPagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default KostList;
