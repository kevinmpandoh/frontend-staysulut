import { Input } from "@/components/form/input/InputField";
import { Label } from "@/components/ui/label";
import { useKostType } from "@/hooks/useKostType";
import { useCreateKostStore } from "@/stores/createKost.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const step1Schema = yup.object({
  harga_perbulan: yup.number().required("Harga kost wajib diisi"),
});

type Step8FormValues = yup.InferType<typeof step1Schema>;

const StepHarga = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Step8FormValues>({
    resolver: yupResolver(step1Schema),
  });

  const { setCurrentStep, setOnNext, hargaPerBulan, kostTypeId, reset } =
    useCreateKostStore();
  const { saveKostTypePrice } = useKostType({});
  const router = useRouter();

  useEffect(() => {
    if (hargaPerBulan) {
      setValue("harga_perbulan", hargaPerBulan || 0);
    }
  }, [hargaPerBulan, setValue]);

  useEffect(() => {
    setOnNext(
      handleSubmit((data) => {
        if (!kostTypeId) return;
        saveKostTypePrice(
          {
            kostTypeId,
            data: { harga_perbulan: data.harga_perbulan },
          },
          {
            onSuccess: () => {
              reset();
              router.push(`/dashboard/owner/kost-saya`);
            },
          }
        );
      })
    );
  }, [setOnNext, setCurrentStep, handleSubmit, saveKostTypePrice, kostTypeId]);
  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Atur Harga Kost Anda</h2>

        {/* Nama Kost */}
        <div className="mb-6 max-w-lg space-y-2">
          <Label className="text-xl">Harga per Bulan</Label>
          <Input
            {...register("harga_perbulan")}
            type="number"
            error={errors.harga_perbulan ? true : false}
          />
          {errors.harga_perbulan && (
            <p className="text-red-500 text-sm">
              {errors.harga_perbulan.message}
            </p>
          )}
        </div>

        <div className="mb-6 max-w-lg space-y-2">
          <Label className="text-xl">Jumlah keseluruhan Kamar</Label>
          <Input type="number" placeholder="10" />
          {/* {errors.totalKamar && (
            <p className="text-sm text-red-500">{errors.totalKamar.message}</p>
          )} */}
        </div>

        {/* Jenis Kost
    <div className="mb-6 max-w-xl">
      <div className="font-semibold text-xl mb-3 text-[#1A1A1A]">
        Jenis Kost
      </div>
      <div className="flex gap-3">
        {["Putra", "Putri", "Campur"].map((jenis: any) => (
          <button
            key={jenis}
            type="button"
            onClick={() => setValue("jenisKost", jenis)}
            className={`flex flex-col items-center gap-2 p-4 border rounded-xl ${
              watch("jenisKost") === jenis
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-300 bg-white text-gray-500"
            }`}
          >
            <Image
              src={`/images/${jenis}.png`}
              alt={jenis}
              width={48}
              height={48}
            />
            Kost {jenis.charAt(0).toUpperCase() + jenis.slice(1)}
          </button>
        ))}
      </div>
      {errors.jenisKost && (
        <p className="text-red-500 text-sm">{errors.jenisKost.message}</p>
      )}
    </div> */}
      </div>
    </>
  );
};

export default StepHarga;
