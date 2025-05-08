"use client";
import React from "react";

import { KostDescription } from "./KostDecription";
import { KostFacilities } from "./KostFacilities";
import { KostImageGallery } from "./KostGalerry";
import { KostInfo } from "./KostInfo";
import { KostLocation } from "./KostLocation";
import KostReviewList from "./KostReviews";
import KostRoomVariants from "./KostRoomVariants";
import { KostRules } from "./KostRules";
import KostSidebarCard from "./KostSidebarCard";
import { OwnerInfo } from "./OwnerInfo";
import { NearbyKostRecommendations } from "./KostNewarByRecomendations";
import KostDetailSkeleton from "./KostDetailSkeleton";
import KostError from "./KostError";
import { useRouter } from "next/navigation";
import { useKostDetail } from "@/hooks/useKostQuery";
import { useAuthStore } from "@/stores/auth.store";
import { useLoginModal } from "@/stores/loginModal.store";

interface DetailKostProps {
  kostId: string;
}

const DetailKost = ({ kostId }: DetailKostProps) => {
  const { data: kost, isLoading, isError } = useKostDetail(kostId);
  const router = useRouter();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());

  if (isLoading) return <KostDetailSkeleton />;

  if (isError || !kost)
    return (
      <KostError message="Gagal memuat detail kost. Silakan coba lagi nanti." />
    );

  const handleBookingCLick = () => {
    if (!isLoggedIn) {
      useLoginModal.getState().open();
      return;
    }
    router.push(`/kosts/${kostId}/booking`);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <KostImageGallery photos={kost?.photos} />

        <div className="grid grid-cols-1 lg:grid-cols-9 gap-20 mt-8">
          <div className="lg:col-span-6 space-y-6  ">
            <KostInfo
              id={kost.id}
              nama={`${kost.nama_kost}`}
              jenis={kost.jenis_kost}
              alamat={`${kost.alamat.kecamatan}, ${kost.alamat.kabupaten_kota}`}
              rating={4.7}
              jumlahUlasan={25}
            />
            <OwnerInfo
              ownerName={kost.owner?.name}
              ownerPhoto="/profile-default.png"
            />
            <KostDescription description={kost.description} />
            <KostFacilities
              roomFacilities={kost.roomFacilities}
              sharedFacilities={kost.kostFacilities}
            />
            <KostRules rules={kost.rules} />

            <KostLocation
              kostName={kost.nama_kost}
              addressDetail={`${kost.alamat.kecamatan}, ${kost.alamat.kabupaten_kota}`}
              latitude={kost.alamat.koordinat.lat}
              longitude={kost.alamat.koordinat.lng}
            />
            <KostRoomVariants variants={kost.otherKostTypes} />
            <KostReviewList reviews={kost.reviews} />
          </div>
          {/* Kanan (sticky) */}
          <div className="h-fit lg:col-span-3 sticky top-32">
            <KostSidebarCard
              price={kost.price}
              handleBookingClick={handleBookingCLick}
            />
          </div>
        </div>

        <NearbyKostRecommendations
          kosts={[
            {
              id: 1,
              nama_kost: "Kost A",
              alamat: "Jl. Kost A No.1",
              jenis_kost: "Putra",
              harga_perbulan: 1000000,
              foto: ["/kost.jpg", "/kost2.png"],
              facilities: ["Wifi", "AC"],
            },
            {
              id: 2,
              nama_kost: "Kost B",
              alamat: "Jl. Kost B No.2",
              jenis_kost: "Putri",
              harga_perbulan: 1200000,
              foto: ["/kost.jpg", "/kost2.png"],
              facilities: ["Wifi", "Kamar Mandi Dalam"],
            },
            {
              id: 3,
              nama_kost: "Kost B",
              alamat: "Jl. Kost B No.2",
              jenis_kost: "Putri",
              harga_perbulan: 1200000,
              foto: ["/kost.jpg", "/kost2.png"],
              facilities: ["Wifi", "Kamar Mandi Dalam"],
            },
            {
              id: 4,
              nama_kost: "Kost B",
              alamat: "Jl. Kost B No.2",
              jenis_kost: "Putri",
              harga_perbulan: 1200000,
              foto: ["/kost.jpg", "/kost2.png"],
              facilities: ["Wifi", "Kamar Mandi Dalam"],
            },
          ]}
        />
      </div>
    </>
  );
};

export default DetailKost;
