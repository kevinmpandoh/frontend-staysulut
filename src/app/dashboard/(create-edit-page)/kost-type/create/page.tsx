// /app/dashboard/tambah-kost/steps/page.tsx
"use client";
import React, { useEffect } from "react";
import SidebarKostType from "./SidebarCreateKostType";
import FooterKostType from "./FooterStep";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";
import StepTipeKost from "./step/StepInformasiTipeKost";
import StepFasilitasTipeKost from "./step/StepFasilitasTipeKost";
import StepFotoTipeKost from "./step/StepFotoTipeKost";
import StepHarga from "./step/StepHarga";
import { useKostType } from "@/hooks/useKostType";
import { useKost } from "@/hooks/useKost";

const CreateKostType = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kostId = searchParams.get("kost_id") ?? "";
  const kostTypeId = searchParams.get("kost_type_id") ?? "";
  const { getKostTypeOwner: kostType, loadingKostTypeOwner } = useKostType({
    kostTypeId: kostTypeId ?? "",
  });

  const { getKostCreate: kost, loadingKostCreate } = useKost({
    kostId: kostId ?? "",
  });

  const {
    currentStep,
    setCurrentStep,
    isLoadedFromBackend,
    setIsLoadedFromBackend,
    setKostId,
    setKostTypeId,
    setFacilitiesKostType,
    setHargaPerBulan,
    setKostType,
    setProgressStep,
  } = useCreateKostStore();

  // Ambil data backend → simpan ke Zustand (sekali saja)
  useEffect(() => {
    if (!kostId || !kostType || isLoadedFromBackend) return;

    setProgressStep(kostType.progress_step);
    setKostId(kostType.kostId);
    setKostTypeId(kostType.id);
    setKostType({
      nama_tipe: kostType.nama_tipe,
      ukuran_kamar: kostType.ukuran_kamar,
      jumlah_kamar: kostType.jumlah_kamar, // array string
      jumlah_terisi: kostType.jumlah_terisi,
    });
    setFacilitiesKostType(kostType.fasilitas);

    setHargaPerBulan(kostType.harga ?? 0);
    setIsLoadedFromBackend(true);
  }, [
    isLoadedFromBackend,
    kostTypeId,
    kostType,
    setKostId,
    setIsLoadedFromBackend,
    setHargaPerBulan,
    setKostType,
    setKostTypeId,
    setFacilitiesKostType,
    kostId,
    setProgressStep,
  ]);

  useEffect(() => {
    if (!kostId) return;
    setKostId(kostId);

    if (!kostTypeId) {
      if (currentStep === 0 || currentStep !== 1) {
        setCurrentStep(1);
      }
      return;
    }

    setKostTypeId(kostTypeId);

    if (!kostType) return;

    const stepRaw = searchParams.get("step");
    const stepParam = stepRaw ? parseInt(stepRaw) : 2;

    const allowedStep = kostType.progress_step;

    // Validasi jika stepParam lebih dari yang diizinkan
    if (stepParam > allowedStep) {
      router.replace(
        `/dashboard/kost-type/create?kost_id=${kostId}&kost_type_id=${kostTypeId}&step=${allowedStep}`
      );
      return;
    }

    // Set current step dari URL
    if (currentStep === 0 || currentStep !== stepParam) {
      setCurrentStep(stepParam);
    }
  }, [
    searchParams,
    kostId,
    setCurrentStep,
    kostType,
    currentStep,
    router,
    setKostId,
    setKostTypeId,
    kostTypeId,
    loadingKostTypeOwner,
  ]);

  if (!kostId) return <h1>Kost ID tidak ditemukan</h1>;
  if (loadingKostCreate || loadingKostTypeOwner || currentStep === 0)
    return <h1>Loading...</h1>;
  if (!kost) return <h1>Kost tidak ditemukan</h1>;

  // Render step sesuai currentStep
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <StepTipeKost />;
      case 2:
        return <StepFasilitasTipeKost />;
      case 3:
        return <StepFotoTipeKost />;
      case 4:
        return <StepHarga />;
      default:
        return <h1>Step tidak valid</h1>;
    }
  };

  return (
    <>
      <div className="flex w-full min-h-screen bg-white">
        {/* Sidebar fixed di kiri */}
        <div className="fixed left-0 top-0 h-screen w-[320px] border-r bg-white z-50">
          <SidebarKostType lastCompletedStep={kostType?.progress_step ?? 1} />
        </div>

        {/* Main content dengan margin kiri untuk offset sidebar */}
        <main className="flex flex-col flex-1 ml-[320px] relative">
          <div className="px-10 py-20 pb-34 flex-1">
            {renderStepComponent()}
          </div>

          <FooterKostType lastCompletedStep={kostType?.progress_step ?? 1} />
        </main>
      </div>
    </>
  );
};

export default CreateKostType;
