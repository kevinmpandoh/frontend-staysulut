"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import FasilitasStep from "./components/FasilitasStep";
import JenisKostStep from "./components/JenisKostStep";
import LocationStep from "./components/LocationStep";
import PriceStep from "./components/PriceStep";

const steps = [
  "Lokasi",
  "Harga",
  "Jenis Kost",
  "Fasilitas",
  "Keamanan",
  "Tinjau",
];

const stepContent = [
  {
    title: "Lokasi yang diinginkan",
    subtitle: "Di mana anda ingin mencari kost?",
  },
  {
    title: "Harga maksimal",
    subtitle: "Berapa harga maksimal yang anda inginkan per bulan?",
  },
  {
    title: "Jenis Kost",
    subtitle: "Pilih jenis kost yang sesuai preferensi Anda.",
  },
  {
    title: "Fasilitas Kost & Kamar",
    subtitle: "Fasilitas apa saja yang Anda inginkan?",
  },
  {
    title: "Keamanan / Peraturan Kost",
    subtitle: "Apa saja keamanan atau peraturan yang Anda harapkan?",
  },
  {
    title: "Tinjau Preferensi",
    subtitle: "Periksa kembali preferensi kost Anda sebelum dikirim.",
  },
];

import { usePreferenceStore } from "@/stores/preference.store";

import { useFacilities } from "@/hooks/useFacilities";
import { usePreference } from "@/hooks/usePreference";
import KeamananStep from "./components/KeamananStep";
export default function PreferencesPage() {
  const [step, setStep] = useState(0);

  const {
    location,
    price,
    jenisKost,
    kostFacilities,
    roomFacilities,
    keamanan,
  } = usePreferenceStore();
  const { savePreferences, savingPreferences } = usePreference();
  const { data, isLoading } = useFacilities();

  const isStepValid =
    (step === 0 && !!location) ||
    (step === 1 && !!price?.min && !!price?.max) ||
    (step === 2 && !!jenisKost) ||
    (step === 3 && kostFacilities.length > 0 && roomFacilities.length > 0) ||
    (step === 4 && keamanan.length > 0) ||
    step === 5;

  const mapIdsToNames = (ids: string[]) => {
    if (!data) return [];
    return ids
      .map((id) => data.find((item: any) => item._id === id)?.nama_fasilitas)
      .filter(Boolean);
  };

  const kostNames = mapIdsToNames(kostFacilities);
  const kamarNames = mapIdsToNames(roomFacilities);

  const handleSave = () => {
    savePreferences();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Step Indicator */}
        <ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
          {steps.map((label, index) => (
            <li
              key={index}
              className={`flex relative   ${
                step > index
                  ? "text-indigo-600 w-full  after:content-[''] after:w-full after:h-0.5 after:bg-indigo-600 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4"
                  : step === index && index !== 4
                  ? "text-gray-900 w-full  after:content-[''] after:w-full after:h-0.5 after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4"
                  : index === 4
                  ? "flex relative text-gray-900  "
                  : "text-gray-900 w-full  after:content-[''] after:w-full after:h-0.5 after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4"
              }`}
            >
              <div className="block whitespace-nowrap z-10">
                <span
                  className={`w-6 h-6 ${
                    step > index
                      ? "bg-indigo-600 border-2 border-transparent text-white"
                      : step === index
                      ? "bg-indigo-50 border-2 border-indigo-600 text-indigo-600"
                      : "bg-gray-50 border-2 border-gray-200 text-gray-500"
                  } rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10`}
                >
                  {index + 1}
                </span>
                {label}
              </div>
            </li>
          ))}
        </ol>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden min-h-[400px] flex flex-col ">
          <div className="px-6 py-6 flex-1 overflow-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                {stepContent[step].title}
              </h2>
              <p className="text-md text-gray-500">
                {stepContent[step].subtitle}
              </p>
            </div>
            <div className="space-y-4">
              {step === 0 && <LocationStep />}

              {step === 1 && <PriceStep />}

              {step === 2 && <JenisKostStep />}

              {step === 3 && (
                <FasilitasStep data={data} isLoading={isLoading} />
              )}
              {step === 4 && <KeamananStep />}

              {step === 5 && (
                <div>
                  <p className="text-gray-500">
                    Tinjau kembali preferensi kost kamu sebelum dikirim:
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Lokasi: {location?.detail || "-"}</li>
                    <li>
                      Harga:{" "}
                      {price?.min && price?.max
                        ? `Rp ${Number(price.min).toLocaleString(
                            "id-ID"
                          )} - Rp ${Number(price.max).toLocaleString("id-ID")}`
                        : "-"}
                    </li>
                    <li>Jenis Kost: {jenisKost || "-"}</li>
                    <li>
                      Fasilitas Kost:{" "}
                      {isLoading ? "Memuat..." : kostNames.join(", ") || "-"}
                    </li>
                    <li>
                      Fasilitas Kamar:{" "}
                      {isLoading ? "Memuat..." : kamarNames.join(", ") || "-"}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Footer bawah card */}
          <div className="px-6 py-4 border-t flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Langkah {step + 1} dari {steps.length}
            </span>
            <div className="space-x-2">
              <Button
                variant="outline"
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
              >
                Sebelumnya
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!isStepValid}
                >
                  Lanjut
                </Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={!isStepValid || savingPreferences}
                  onClick={handleSave}
                >
                  {savingPreferences ? "Menyimpan..." : "Simpan Preferensi"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
