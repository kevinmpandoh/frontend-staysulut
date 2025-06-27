"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useCreateKostStore } from "@/stores/createKost.store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/form/input/InputField";
import clsx from "clsx";
import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKostType } from "@/hooks/useKostType";
import { useRouter } from "next/navigation";

export const presetUkuran = ["3 X 3", "3 X 4", "Lainnya"] as const;

export const tipeKostSchema = z
  .object({
    namaTipe: z.string().min(1, "Nama tipe kost wajib diisi"),

    ukuran: z.enum(presetUkuran, {
      errorMap: () => ({ message: "Ukuran kamar wajib dipilih" }),
    }),

    panjangCustom: z
      .number({ invalid_type_error: "Panjang wajib berupa angka" })
      .positive("Harus lebih dari 0")
      .optional(),

    lebarCustom: z
      .number({ invalid_type_error: "Lebar wajib berupa angka" })
      .positive("Harus lebih dari 0")
      .optional(),

    totalKamar: z
      .number({ invalid_type_error: "Jumlah kamar wajib berupa angka" })
      .min(1, "Minimal 1 kamar"),

    kamarTerisi: z
      .number({ invalid_type_error: "Kamar terisi wajib berupa angka" })
      .min(0, "Tidak boleh negatif"),
  })
  .refine(
    (data) => {
      if (data.ukuran === "Lainnya") {
        return (
          typeof data.panjangCustom === "number" &&
          typeof data.lebarCustom === "number"
        );
      }
      return true;
    },
    {
      message: "Panjang dan lebar wajib diisi jika ukuran lainnya dipilih",
      path: ["panjangCustom"],
    }
  )
  .refine((data) => data.kamarTerisi <= data.totalKamar, {
    message: "Kamar terisi tidak boleh melebihi total kamar",
    path: ["kamarTerisi"],
  });

// type TipeKostForm = yup.InferType<typeof schema>;
export type TipeKostForm = z.infer<typeof tipeKostSchema>;

const StepTipeKost = () => {
  const { setCurrentStep, setOnNext, kostId } = useCreateKostStore();

  const { create, edit } = useKostType({});

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TipeKostForm>({
    resolver: zodResolver(tipeKostSchema),
    // defaultValues: tipeKostData,
  });

  const { kostType, kostTypeId } = useCreateKostStore();

  const selectedUkuran = watch("ukuran");

  useEffect(() => {
    if (kostType && Object.keys(kostType).length > 0) {
      setValue("namaTipe", kostType.nama_tipe || "");
      setValue("totalKamar", kostType.jumlah_kamar || 0);
      setValue("kamarTerisi", kostType.jumlah_terisi || 0);

      const ukuranKamar = kostType.ukuran_kamar;

      if (ukuranKamar) {
        const isPreset = presetUkuran.includes(
          ukuranKamar as (typeof presetUkuran)[number]
        );

        if (isPreset) {
          setValue("ukuran", ukuranKamar as (typeof presetUkuran)[number]);
        } else {
          setValue("ukuran", "Lainnya");

          const [panjang, lebar] = ukuranKamar
            .toLowerCase()
            .split("x")
            .map((val) => parseFloat(val.trim()));

          if (!isNaN(panjang)) setValue("panjangCustom", panjang);
          if (!isNaN(lebar)) setValue("lebarCustom", lebar);
        }
      } else {
        setValue("ukuran", "3 X 3"); // fallback default jika undefined
      }
    }
  }, [kostType, setValue]);

  useEffect(() => {
    // setCurrentStep(3); // step ini
    setOnNext(
      handleSubmit((data) => {
        const finalUkuran =
          data.ukuran === "Lainnya"
            ? `${data.panjangCustom}x${data.lebarCustom}`
            : data.ukuran;

        const formData = {
          nama_tipe: data.namaTipe,
          ukuran_kamar: finalUkuran,
          total_kamar: data.totalKamar,
          kamar_terisi: data.kamarTerisi,
          kost: kostId,
        };

        if (kostTypeId) {
          // 🟢 Jika sudah ada data → edit
          edit(
            { id: kostTypeId, data: formData },
            {
              onSuccess: () => {
                setCurrentStep(6);
                router.replace(
                  `/dashboard/tambah-kost?kost_id=${kostId}&step=6`
                );
              },
            }
          );
        } else {
          // 🟢 Jika belum ada data → create

          create(
            { data: formData },
            {
              onSuccess: () => {
                setCurrentStep(6);
                router.replace(
                  `/dashboard/tambah-kost?kost_id=${kostId}&step=6`
                );
              },
            }
          );
        }
      })
    );
  }, [
    setCurrentStep,
    setOnNext,
    handleSubmit,
    create,
    kostId,
    edit,
    kostTypeId,
  ]);

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Lengkapi Data tipe kost anda</h2>

        {/* Nama Kost */}
        <div className="mb-6 max-w-lg">
          <Label className="text-xl">Nama Tipe Kost</Label>
          <Input
            {...register("namaTipe")}
            type="text"
            error={errors.namaTipe ? true : false}
          />
          {errors.namaTipe && (
            <p className="text-red-500 text-sm">{errors.namaTipe.message}</p>
          )}

          <p className="text-sm text-[#7A7A7A] mt-1">
            Saran: Kost (spasi) Nama kost
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-xl">Ukuran Kamar</Label>
          <div className="flex gap-4">
            {presetUkuran.map((ukuran) => (
              <Button
                key={ukuran}
                variant={selectedUkuran === ukuran ? "default" : "outline"}
                type="button"
                onClick={() => setValue("ukuran", ukuran)}
                // className="w-[90px] h-[90px]"
                className={clsx(
                  "text-sm",
                  ukuran === "3 X 3" && "w-24 h-24 p-0",
                  ukuran === "3 X 4" && "w-36 h-24 p-0",
                  ukuran === "Lainnya" && "rounded-full px-6 h-24 w-24"
                )}
              >
                {ukuran}
              </Button>
            ))}

            {selectedUkuran === "Lainnya" && (
              <div className="mt-4 flex gap-4">
                <div className="w-1/2 space-y-2">
                  <Label>Panjang (m)</Label>
                  <Input
                    type="number"
                    placeholder="Contoh: 4"
                    {...register("panjangCustom", { valueAsNumber: true })}
                  />
                  {errors.panjangCustom && (
                    <p className="text-sm text-red-500">
                      {errors.panjangCustom.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2 space-y-2">
                  <Label>Lebar (m)</Label>
                  <Input
                    type="number"
                    placeholder="Contoh: 5"
                    {...register("lebarCustom", { valueAsNumber: true })}
                  />
                  {errors.lebarCustom && (
                    <p className="text-sm text-red-500">
                      {errors.lebarCustom.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 max-w-lg space-y-2">
          <Label className="text-xl">Jumlah keseluruhan Kamar</Label>
          <Input
            type="number"
            placeholder="10"
            {...register("totalKamar", { valueAsNumber: true })}
          />
          {errors.totalKamar && (
            <p className="text-sm text-red-500">{errors.totalKamar.message}</p>
          )}
        </div>

        <div className="mb-6 max-w-lg space-y-2">
          <Label className="text-xl">Jumlah Kamar yang terisi</Label>
          <Input
            type="number"
            placeholder="2"
            {...register("kamarTerisi", { valueAsNumber: true })}
          />
          {errors.kamarTerisi && (
            <p className="text-sm text-red-500">{errors.kamarTerisi.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default StepTipeKost;
