"use client";

import { MapPin, Star, Share2, Heart } from "lucide-react";
// import { cn } from "@/lib/utils"; // opsional helper untuk className
// import { Badge } from "@/components/ui/badge";

interface KostInfoProps {
  nama: string;
  jenis: string;
  alamat: string;
  rating: number;
  jumlahUlasan: number;
}

export function KostInfo({
  nama,
  jenis,
  alamat,
  rating,
  jumlahUlasan,
}: KostInfoProps) {
  return (
    <div className="space-y-4">
      {/* Jenis & Nama */}
      <div className="flex justify-between items-start">
        <div>
          {/* <div className="text-sm text-muted-foreground font-medium">
            {jenis}
          </div> */}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mb-2">
            {jenis}
          </span>
          <h1 className="text-2xl font-semibold text-foreground leading-tight">
            {nama}
          </h1>
        </div>

        {/* Share & Favorite - Desktop only */}
        <div className="hidden sm:flex gap-2">
          <button className="p-2 rounded-full hover:bg-accent">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-full hover:bg-accent">
            <Heart className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Alamat */}
      <div className="flex items-center gap-2 text-md text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>{alamat}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 text-sm text-yellow-500">
        <Star className="w-4 h-4 fill-yellow-500" />
        <span>{rating}</span>
        <span className="text-muted-foreground">({jumlahUlasan} ulasan)</span>
      </div>
    </div>
  );
}
