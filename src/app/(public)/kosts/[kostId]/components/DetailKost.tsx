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
  const { data: kost, isLoading, isError, error } = useKostDetail(kostId);
  const router = useRouter();

  const { isAuthenticated } = useAuthStore();

  if (isLoading) return <KostDetailSkeleton />;

  if (isError || !kost) {
    if ((error as any)?.status === 404) {
      return <KostError message="Kost tidak ditemukan atau sudah dihapus." />;
    }

    return (
      <KostError message="Gagal memuat detail kost. Silakan coba lagi nanti." />
    );
  }
  const handleBookingCLick = (tanggalMasuk: string) => {
    if (!isAuthenticated) {
      useLoginModal.getState().open();
      return;
    }

    // Kamu bisa kirim tanggal masuk ke halaman booking, atau simpan di store
    router.push(`/kosts/${kostId}/booking?tanggalMasuk=${tanggalMasuk}`);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <KostImageGallery photos={kost?.photos} />

        <div className="grid grid-cols-1 lg:grid-cols-9 gap-10 mt-8">
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
              ownerPhoto={kost.owner?.avatar || "/profile-default.png"}
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
              kostId={kost.id}
              handleBookingClick={handleBookingCLick}
            />
          </div>
        </div>

        <NearbyKostRecommendations kosts={kost.nearbyKosts} />
      </div>
    </>
  );
};

export default DetailKost;
