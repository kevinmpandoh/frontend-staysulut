// /app/dashboard/tambah-kost/steps/page.tsx
"use client";
import React, { useEffect } from "react";
import StepAlamatKost from "./steps/StepAlamatKost";
import StepInformasiKost from "./steps/StepInformasiKost";
import StepFasilitasKost from "./steps/StepFasilitasKost";
import StepFotoKost from "./steps/StepFotoKost";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useKost } from "@/hooks/useKost";
import StepSidebar from "./StepSidebar";
import FooterStep from "./FooterStep";
import StepInformasiTipeKost from "./steps/StepInformasiTipeKost";
import StepFasilitasTipeKost from "./steps/StepFasilitasTipeKost";
import StepFotoTipeKost from "./steps/StepFotoTipeKost";
import StepHarga from "./steps/StepHarga";

const TambahKostPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kostId = searchParams.get("kost_id") ?? "";
  const { getKostCreate: kost, loadingKostCreate } = useKost({
    kostId: kostId ?? "",
  });

  const {
    currentStep,
    setCurrentStep,
    setInformasiKost,
    isLoadedFromBackend,
    setIsLoadedFromBackend,
    setKostId,
    setKostTypeId,
    setAlamatKost,
    setFacilitiesKost,
    setFacilitiesKostType,
    setHargaPerBulan,
    setKostType,
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
    const stepParam = stepRaw ? parseInt(stepRaw) : 2;
    const allowedStep = kost.progress_step;

    // Validasi jika stepParam lebih dari yang diizinkan
    if (stepParam > allowedStep) {
      router.replace(
        `/dashboard/tambah-kost?kost_id=${kostId}&step=${allowedStep}`
      );
      return;
    }

    // Set current step dari URL
    if (currentStep === 0 || currentStep !== stepParam) {
      setCurrentStep(stepParam);
    }
  }, [searchParams, kost, kostId, setCurrentStep, currentStep, router]);

  // Ambil data backend → simpan ke Zustand (sekali saja)
  useEffect(() => {
    if (!kostId) {
      // jika tidak ada kost_id, berarti mulai baru → set ke step 1
      if (currentStep === 0 || currentStep !== 1) {
        setCurrentStep(1);
      }
      return;
    }
    if (!kost || isLoadedFromBackend) return;

    const stepRaw = searchParams.get("step");
    const stepParam = stepRaw ? parseInt(stepRaw) : 2;
    const allowedStep = kost.progress_step;

    // Validasi jika stepParam lebih dari yang diizinkan
    if (stepParam > allowedStep) {
      router.replace(
        `/dashboard/tambah-kost?kost_id=${kostId}&step=${allowedStep}`
      );
      return;
    }

    // Set current step dari URL
    if (currentStep === 0 || currentStep !== stepParam) {
      setCurrentStep(stepParam);
    }

    // Set ke store
    setKostId(kost.id);
    setInformasiKost({
      nama_kost: kost.nama_kost,
      jenis_kost: kost.jenis_kost,
      peraturan: kost.peraturan, // array string
      deskripsi: kost.deskripsi,
    });
    setAlamatKost(kost.alamat);
    setFacilitiesKost(kost.fasilitas_kost);

    const kostType = kost.kost_type;

    if (!kostType) return;

    setKostTypeId(kostType.id);
    setKostType({
      nama_tipe: kostType.nama_tipe,
      ukuran_kamar: kostType.ukuran_kamar,
      jumlah_kamar: kostType.jumlah_kamar, // array string
      jumlah_terisi: kostType.kamar_terisi,
    });
    setFacilitiesKostType(kostType.fasilitas);

    setHargaPerBulan(kostType.harga ?? 0);

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
    setKostType,
    setHargaPerBulan,
    setKostTypeId,
    setFacilitiesKostType,
  ]);

  if (loadingKostCreate || currentStep === 0) return <h1>Loading...</h1>;

  // Render step sesuai currentStep
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
      case 5:
        return <StepInformasiTipeKost />;
      case 6:
        return <StepFasilitasTipeKost />;
      case 7:
        return <StepFotoTipeKost />;
      case 8:
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
          <StepSidebar lastCompletedStep={kost?.progress_step ?? 1} />
        </div>

        {/* Main content dengan margin kiri untuk offset sidebar */}
        <main className="flex flex-col flex-1 ml-[320px] relative">
          <div className="px-10 py-20 pb-34 flex-1">
            {renderStepComponent()}
          </div>

          <FooterStep lastCompletedStep={kost?.progress_step ?? 1} />
        </main>
      </div>
    </>
  );
};

export default TambahKostPage;
