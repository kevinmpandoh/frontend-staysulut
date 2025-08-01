"use client";

import React, { useRef } from "react";
import KostCard from "../../components/CardListKost";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKostRecomended } from "@/hooks/useKostQuery";
import KostCardSkeleton from "@/components/Skeleton/CardListKostSkeleton";

const KostRecomendedSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const {
    data: kostRecomended,
    isLoading,
    isError,
    refetch,
  } = useKostRecomended();

  if (isLoading) {
    return (
      <div className="grid px-36 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <KostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      //  Perbaikan error state dan tombol refetch
      <div className="mt-6 h-[300px] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <p className="text-gray-500 mb-2">Gagal memuat data kost.</p>
          <Button variant="outline" onClick={() => refetch()}>
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="container bg-white mx-auto px-6 md:px-18 lg:px-36 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg lg:text-2xl font-bold">
          Rekomendasi Kost Untuk Anda
        </h2>
      </div>

      <div className="relative">
        {/* Tombol navigasi di desktop */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute right-15 -top-10 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 -top-10 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto md:overflow-x-hidden scroll-smooth no-scrollbar"
        >
          {kostRecomended?.data.map((kost: any, index: number) => (
            <div key={index} className="min-w-[243px] md:flex-1">
              <KostCard
                id={kost.id}
                title={kost.nama_kost}
                location={kost.alamat}
                type={kost.jenis_kost}
                price={kost.price}
                images={kost.photos}
                facilities={kost.fasilitas}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-center items-center">
        <Button variant={"link"}>
          <Link href="/kosts/recomended" className="text-teal-500 text-lg">
            Lihat Semua
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default KostRecomendedSection;
