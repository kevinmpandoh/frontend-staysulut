"use client";

import { ShareModal } from "@/components/ShareModal";
import { useIsWishlisted, useWishlist } from "@/hooks/useWishlist";
import { MapPin, Star, Share2, Heart } from "lucide-react";
import { useState } from "react";
// import { cn } from "@/lib/utils"; // opsional helper untuk className
// import { Badge } from "@/components/ui/badge";

interface KostInfoProps {
  id: string;
  nama: string;
  jenis: string;
  alamat: string;
  rating: number;
  jumlahUlasan: number;
}

export function KostInfo({
  id,
  nama,
  jenis,
  alamat,
  rating,
  jumlahUlasan,
}: KostInfoProps) {
  const [isShareOpen, setShareOpen] = useState(false);
  const { addToWishlist, removeFromWishlist, adding, removing } = useWishlist();
  const { data: isWishlisted, isLoading: checkingWishlist } =
    useIsWishlisted(id);
  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <>
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
            <button
              onClick={() => setShareOpen(true)}
              className="p-2 rounded-full hover:bg-accent"
            >
              <Share2 className="w-6 h-6 text-muted-foreground" />
            </button>
            <button
              onClick={toggleWishlist}
              className="p-2 rounded-full hover:bg-accent transition"
              disabled={adding || removing || checkingWishlist}
            >
              <Heart
                className={`w-6 h-6  ${
                  isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
                }`}
              />
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
      <ShareModal
        open={isShareOpen}
        onClose={() => setShareOpen(false)}
        url={typeof window !== "undefined" ? window.location.href : ""}
      />
    </>
  );
}
