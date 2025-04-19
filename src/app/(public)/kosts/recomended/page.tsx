"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KostCard from "@/components/CardListKost";
import { Funnel, ListFilter } from "lucide-react";

const dummyKosts = [...Array(9)].map((_, i) => ({
  id: i.toString(),
  title: `Kost Vinshi ${i + 1}`,
  location: "Remboken, Minahasa",
  type: "Campur",
  price: 120000,
  images: ["/kost.jpg", "/kost2.png"],
  facilities: ["wifi", "dapur", "parkiran"],
}));

export default function RekomendasiKostPage() {
  const [kostList] = useState(dummyKosts);

  return (
    <main className="container mx-auto px-6 md:px-16 lg:px-36 py-12 space-y-10 mt-30">
      {/* Header */}
      <section className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Rekomendasi Kost Untuk Anda
        </h1>
        <p className="text-sm text-gray-500">
          Berikut kost yang kami rekomendasikan berdasarkan preferensi Anda.
        </p>
        <Button variant="outline" className="mt-2">
          Edit Preferensi
        </Button>
      </section>

      {/* Filter & Sort */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto">
            <Funnel className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            <ListFilter className="w-4 h-4 mr-2" />
            Urutkan
          </Button>
        </div>
        <Input
          placeholder="Cari nama kost atau lokasi..."
          className="max-w-sm mt-2 md:mt-0"
        />
      </section>

      {/* Kost List */}
      <section>
        {kostList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">
              Belum ada kost yang cocok ditemukan.
            </p>
            <Button variant="link" className="text-teal-600 mt-2">
              Edit Preferensi
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kostList.map((kost) => (
              <KostCard key={kost.id} {...kost} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
