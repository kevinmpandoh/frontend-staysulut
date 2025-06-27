"use client";
import React from "react";
import KostCard from "./KostCard";
import { useKost } from "@/hooks/useKost";

const KostList = () => {
  const { kostOwner, loadingKostOwner } = useKost({});

  if (loadingKostOwner) {
    return <h1>Loading</h1>;
  }

  if (!kostOwner || kostOwner.length === 0) {
    return <p>Tidak ada kost yang ditemukan.</p>;
  }

  return (
    <>
      {kostOwner.map((kost: any) => (
        <KostCard key={kost.id} kost={kost} />
      ))}
    </>
  );
};

export default KostList;
