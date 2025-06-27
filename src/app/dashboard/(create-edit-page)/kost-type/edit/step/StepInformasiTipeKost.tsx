"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useCreateKostStore } from "@/stores/createKost.store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/form/input/InputField";
import clsx from "clsx";
// import * as yup from "yup";
import { useEffect } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useKostType } from "@/hooks/useKostType";
import { useEditKostModalStore } from "@/stores/editKostModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { tipeKostSchema } from "@/validation/kostType.validation";

const presetUkuran = ["3 X 3", "3 X 4", "Lainnya"] as const;

// const schema = yup.object({
//   namaTipe: yup.string().required("Nama tipe kost wajib diisi"),
//   ukuran: yup
//     .string()
//     .oneOf(presetUkuran as readonly string[])
//     .required(),
//   panjangCustom: yup
//     .number()
//     .typeError("Panjang wajib berupa angka")
//     .when("ukuran", {
//       is: "Lainnya",
//       then: (schema) =>
//         schema.required("Panjang wajib diisi").positive("Harus lebih dari 0"),
//       otherwise: (schema) => schema.optional().strip(),
//     })
//     .optional(),

//   lebarCustom: yup
//     .number()
//     .typeError("Lebar wajib berupa angka")
//     .when("ukuran", {
//       is: "Lainnya",
//       then: (schema) =>
//         schema.required("Lebar wajib diisi").positive("Harus lebih dari 0"),
//       otherwise: (schema) => schema.optional().strip(),
//     })
//     .optional(),
//   totalKamar: yup
//     .number()
//     .typeError("Jumlah kamar wajib berupa angka")
//     .required("Total kamar wajib diisi")
//     .min(1, "Minimal 1 kamar"),
//   kamarTerisi: yup
//     .number()
//     .typeError("Kamar terisi wajib berupa angka")
//     .required("Jumlah kamar terisi wajib diisi")
//     .min(0, "Tidak boleh negatif")
//     .test(
//       "lessThanTotal",
//       "Kamar terisi tidak boleh melebihi total kamar",
//       function (value) {
//         return value <= this.parent.totalKamar;
//       }
//     ),
// });

// type TipeKostForm = yup.InferType<typeof schema>;

const StepTipeKost = () => {
  const { setCurrentStep, setOnNext, kostId, kostTypeId } =
    useCreateKostStore();
  const { create, edit } = useKostType({});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof tipeKostSchema>>({
    resolver: zodResolver(tipeKostSchema),
    // defaultValues: tipeKostData,
  });

  const { kostType } = useCreateKostStore();

  const { setIsSubmitSuccess } = useEditKostModalStore();

  const selectedUkuran = watch("ukuran");

  useEffect(() => {
    if (kostType && Object.keys(kostType).length > 0) {
      setValue("namaTipe", kostType.nama_tipe || "");

      if (presetUkuran.includes(kostType.ukuran_kamar as any)) {
        setValue(
          "ukuran",
          kostType.ukuran_kamar as (typeof presetUkuran)[number]
        );
      } else {
        setValue("ukuran", "Lainnya"); // fallback kalau bukan preset
        // kamu bisa juga set panjang/lebarCustom dari parsing ukuran_kamar jika mau
      }
      // setValue("ukuran", kostType.ukuran_kamar || "");
      setValue("totalKamar", kostType.jumlah_kamar || 0);
      setValue("kamarTerisi", kostType.jumlah_terisi || 0);
    }
  }, [kostType, setValue]);

  useEffect(() => {
    // setCurrentStep(3); // step ini
    setOnNext(
      handleSubmit((data) => {
        if (!kostTypeId) return;
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

        // 🟢 Jika sudah ada data → edit
        edit(
          { id: kostTypeId, data: formData },
          {
            onSuccess: () => {
              setIsSubmitSuccess(true);
            },
          }
        );
      })
    );
  }, [
    setCurrentStep,
    setOnNext,
    handleSubmit,
    create,
    setIsSubmitSuccess,
    kostId,
    kostTypeId,
    edit,
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
                <div className="w-1/2">
                  <Label>Panjang (m)</Label>
                  <Input
                    type="number"
                    placeholder="Contoh: 4"
                    {...register("panjangCustom")}
                  />
                  {errors.panjangCustom && (
                    <p className="text-sm text-red-500">
                      {errors.panjangCustom.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  <Label>Lebar (m)</Label>
                  <Input
                    type="number"
                    placeholder="Contoh: 5"
                    {...register("lebarCustom")}
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
          <Input type="number" placeholder="10" {...register("totalKamar")} />
          {errors.totalKamar && (
            <p className="text-sm text-red-500">{errors.totalKamar.message}</p>
          )}
        </div>

        <div className="mb-6 max-w-lg space-y-2">
          <Label className="text-xl">Jumlah Kamar yang terisi</Label>
          <Input type="number" placeholder="2" {...register("kamarTerisi")} />
          {errors.kamarTerisi && (
            <p className="text-sm text-red-500">{errors.kamarTerisi.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default StepTipeKost;
