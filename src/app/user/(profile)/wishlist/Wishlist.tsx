"use client";
import React from "react";
import KostCard from "@/components/CardListKost";
import { useWishlist } from "@/hooks/useWishlist";
import { kostList } from "@/types/kost.type";
import Link from "next/link";
import Image from "next/image";

export const Wishlist = () => {
  const { wishlist = [], isLoading } = useWishlist();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!wishlist.data || wishlist.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mx-auto h-[50vh] space-y-4">
        <Image
          src={"/Empty.svg"}
          alt="Empty state illustration"
          width={240}
          height={240}
          className="w-48 h-48 mb-4"
        />
        <p className="text-gray-500 text-lg">Kamu belum punya wishlist.</p>
        <Link
          href={"/kosts"}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Cari Kost
        </Link>
      </div>
    );
  }

  return (
    <>
      {wishlist.data.map((item: kostList) => (
        <KostCard
          key={item.id}
          id={item.kostType_id}
          title={item.namaKost}
          location={item.alamat}
          type={item.jenisKost}
          price={item.harga}
          images={item.images}
          facilities={item.fasilitas}
          claasName="w-[250px]"
        />
      ))}
    </>
  );
};
