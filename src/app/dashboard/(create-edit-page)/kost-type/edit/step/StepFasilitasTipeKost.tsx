"use client";

import { useEffect } from "react";
import { useFacilities } from "@/hooks/useFacilities";
import { FACILITY_ICONS, DEFAULT_FACILITY_ICON } from "@/constants/facilities"; // sesuaikan path-nya
import { cn } from "@/lib/utils";
import { useCreateKostStore } from "@/stores/createKost.store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useKostType } from "@/hooks/useKostType";
import { useEditKostModalStore } from "@/stores/editKostModal";

export const step3Schema = yup.object({
  fasilitas_tipe_kost: yup
    .array()
    .of(yup.string().defined())
    .min(1, "Pilih minimal satu fasilitas")
    .required("Fasilitas harus dipilih"), // <- ini penting
});

type Step3FormValues = yup.InferType<typeof step3Schema>;

const StepFasilitasTipeKost = () => {
  const { data, isLoading } = useFacilities();

  const { setCurrentStep, setOnNext, kostTypeId, facilitiesKostType } =
    useCreateKostStore();
  const { saveFacilities } = useKostType({
    kostTypeId: kostTypeId ?? "",
  });

  const { setIsSubmitSuccess } = useEditKostModalStore();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step3FormValues>({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      fasilitas_tipe_kost: [],
    },
  });

  const selected = watch("fasilitas_tipe_kost");

  useEffect(() => {
    if (facilitiesKostType && facilitiesKostType.length > 0) {
      setValue("fasilitas_tipe_kost", facilitiesKostType || []);
    }
  }, [facilitiesKostType, setValue]);

  useEffect(() => {
    // setCurrentStep(3);
    setOnNext(
      handleSubmit((data) => {
        if (!kostTypeId) return;
        saveFacilities(
          {
            kostTypeId,
            data: {
              fasilitas: data.fasilitas_tipe_kost,
            },
          },
          {
            onSuccess: async () => {
              setIsSubmitSuccess(true);
            },
          }
        );
      })
    );
  }, [
    setOnNext,
    setCurrentStep,
    handleSubmit,
    saveFacilities,
    kostTypeId,
    setIsSubmitSuccess,
  ]);
  if (isLoading) return <p>Loading...</p>;

  const handleToggle = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    setValue("fasilitas_tipe_kost", newSelected, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const fasilitasKost =
    data?.filter((item: any) => item.kategori === "kamar") || [];

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-6">Fasilitas Kamar Anda</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
        {fasilitasKost.map((fasilitas: any) => {
          const isSelected = selected.includes(fasilitas._id);
          const iconInfo = FACILITY_ICONS[fasilitas.nama_fasilitas];
          const Icon = iconInfo?.icon || DEFAULT_FACILITY_ICON;

          return (
            <button
              key={fasilitas._id}
              type="button"
              onClick={() => handleToggle(fasilitas._id)}
              className={cn(
                "flex items-center gap-3 border rounded-lg px-4 py-3 transition text-left",
                isSelected
                  ? "bg-primary/10 border-primary"
                  : "bg-white border-[#D9D9D9]"
              )}
            >
              <Icon
                className={`w-5 h-5 ${
                  isSelected ? "text-primary" : "text-gray-700"
                }`}
              />
              <span className="text-sm font-medium text-gray-800">
                {fasilitas.nama_fasilitas}
              </span>
            </button>
          );
        })}
      </div>
      {errors.fasilitas_tipe_kost && (
        <p className="text-red-500 text-sm mt-4">
          {errors.fasilitas_tipe_kost.message}
        </p>
      )}
    </div>
  );
};

export default StepFasilitasTipeKost;
