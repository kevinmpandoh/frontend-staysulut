"use client";

import React, { useRef } from "react";
import KostCard from "../../components/CardListKost";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const kostData = [...Array(10)]; // nanti ganti dengan data asli dari props/fetch

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
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto md:overflow-x-hidden scroll-smooth no-scrollbar"
        >
          {kostData.map((_, i) => (
            <div key={i} className="min-w-[280px]  md:flex-1">
              <KostCard
                title="Kost Vinshi"
                location="Remboken, Minahasa"
                type="Campur"
                price={120000}
                images={["/kost.jpg", "/kost2.png"]}
                facilities={["wifi", "dapur", "parkiran"]}
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
