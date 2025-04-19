"use client";

import Image from "next/image";
import { BedDouble, Ruler, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SectionTitle } from "./SectionTitle";

type KostRoomVariant = {
  id: string;
  nama_tipe: string;
  photos: string[];
  price: number;
  remaining: number;
  size: string;
  facilities: string[];
};

type Props = {
  variants: KostRoomVariant[];
};

export default function KostRoomVariantCarousel({ variants }: Props) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Tipe Kamar Lainnya" />

      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="w-60 flex-shrink-0 rounded-xl border bg-white shadow-sm overflow-hidden"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={variant.photos[0]}
                  alt={variant.nama_tipe}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-1">
                <p className="text-sm text-red-600 font-medium">
                  Sisa {variant.remaining} kamar
                </p>
                <h3 className="font-semibold">{variant.nama_tipe}</h3>
                {/* <p className="text-sm text-muted-foreground">
                  {variant.facilities.join(" · ")}
                </p> */}

                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    {variant.size}
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4" />
                    Kasur
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Tidak termasuk listrik
                  </div>
                </div>

                <p className="mt-4 font-semibold text-primary">
                  Rp{variant.price.toLocaleString("id-ID")}/bulan
                </p>

                <div className="flex gap-2 mt-2 w-full">
                  <Button variant="outline" size={"sm"} className=" text-sm">
                    Lihat Detail
                  </Button>
                  <Button className="text-sm" size={"sm"}>
                    Ajukan sewa
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
