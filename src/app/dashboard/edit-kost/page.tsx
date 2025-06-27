"use client";
import React, { useEffect } from "react";
import StepSidebar from "./StepSidebar";
import FooterStep from "./FooterStep";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useKost } from "@/hooks/useKost";

import StepInformasiKost from "./steps/StepInformasiKost";
import ModalSuccessSubmit from "./ModalSuccessSubmit";
import StepAlamatKost from "./steps/StepAlamatKost";
import StepFasilitasKost from "./steps/StepFasilitasKost";
import StepFotoKost from "./steps/StepFotoKost";

const EditKost = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kostId = searchParams.get("kost_id") ?? "";

  const {
    detailKost: kost,
    loadingDetailKost,
    errorDetailKost,
    isError,
  } = useKost({
    kostId: kostId ?? "",
  });

  const {
    currentStep,
    setCurrentStep,
    setInformasiKost,
    isLoadedFromBackend,
    setIsLoadedFromBackend,
    setKostId,
    setAlamatKost,
    setFacilitiesKost,
  } = useCreateKostStore();

  useEffect(() => {
    if (!kostId) {
      // jika tidak ada kost_id, berarti mulai baru → set ke step 1
      if (currentStep === 0 || currentStep !== 1) {
        setCurrentStep(1);
      }
      return;
    }

    if (!kost) return;

    const stepRaw = searchParams.get("step");
    const stepParam = stepRaw ? parseInt(stepRaw) : 1;

    // Set current step dari URL
    if (currentStep === 0 || currentStep !== stepParam) {
      setCurrentStep(stepParam);
    }
  }, [searchParams, kost, kostId, setCurrentStep, currentStep, router]);

  useEffect(() => {
    if (!kostId || !kost || isLoadedFromBackend) return;

    // Set ke store
    setKostId(kostId);
    setInformasiKost({
      nama_kost: kost.nama_kost,
      jenis_kost: kost.jenis_kost,
      peraturan: kost.peraturan.map((p: any) => p._id), // array string
      deskripsi: kost.deskripsi,
    });
    setAlamatKost({
      provinsi: kost.alamat.provinsi,
      kabupaten_kota: kost.alamat.kabupaten_kota,
      kecamatan: kost.alamat.kecamatan,
      detail_alamat: kost.alamat.detail_alamat,
      koordinat: {
        lat: kost.alamat.koordinat.lat,
        lng: kost.alamat.koordinat.lng,
      },
    });

    setFacilitiesKost(kost.fasilitas_kost.map((f: any) => f._id));

    setIsLoadedFromBackend(true);
  }, [
    kostId,
    kost,
    isLoadedFromBackend,
    setKostId,
    setInformasiKost,
    setAlamatKost,
    setFacilitiesKost,
    setIsLoadedFromBackend,
  ]);

  if (loadingDetailKost || (currentStep === 0 && !isError))
    return <h1>Loading...</h1>;

  // Ambil data backend → simpan ke Zustand (sekali saja)
  if (errorDetailKost && isError) return <div>Kost tidak ditemukan</div>;

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <StepInformasiKost />;
      case 2:
        return <StepAlamatKost />;
      case 3:
        return <StepFasilitasKost />;
      case 4:
        return <StepFotoKost />;

      default:
        return <h1>Step tidak valid</h1>;
    }
  };
  return (
    <>
      <div className="flex w-full min-h-screen bg-white">
        {/* Sidebar fixed di kiri */}
        <div className="fixed left-0 top-0 h-screen w-[320px] border-r bg-white z-50">
          <StepSidebar />
        </div>

        {/* Main content dengan margin kiri untuk offset sidebar */}
        <main className="flex flex-col flex-1 ml-[320px] relative">
          <div className="px-10 py-20 pb-34 flex-1">
            {renderStepComponent()}
          </div>

          <FooterStep lastCompletedStep={8} />
        </main>
      </div>

      <ModalSuccessSubmit />
    </>
  );
};

export default EditKost;
