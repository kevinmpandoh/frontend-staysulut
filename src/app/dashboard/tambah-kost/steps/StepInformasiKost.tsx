// /app/owner/kosts/new/step-1/page.tsx
"use client";

import { Input } from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { useKost } from "@/hooks/useKost";
import { useRules } from "@/hooks/useRules";
import { useCreateKostStore } from "@/stores/createKost.store";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const step1Schema = yup.object({
  namaKost: yup.string().required("Nama kost wajib diisi"),
  jenisKost: yup
    .string()
    .oneOf(["Putra", "Putri", "Campur"])
    .required("Pilih jenis kost"),
  deskripsi: yup.string().required("Deskripsi kost wajib diisi"),
  peraturan: yup
    .array()
    .of(yup.string().required())
    .required("Peraturan kost wajib diisi"),
});

type Step1FormValues = yup.InferType<typeof step1Schema>;

export default function Step1Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Step1FormValues>({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      peraturan: [], // ini tetap diberikan agar form tidak error saat pertama kali render
    },
  });

  const { rules } = useRules();
  const { createKost, editKost } = useKost({});
  const router = useRouter();

  const {
    currentStep,
    setCurrentStep,
    setOnNext,
    informasiKost,
    setInformasiKost,
    kostId,
  } = useCreateKostStore();
  //   const [rules, setRules] = useState<string[]>([]);
  const selectedRules = watch("peraturan") || []; // tambahkan fallback ke []

  useEffect(() => {
    if (informasiKost && Object.keys(informasiKost).length > 0) {
      setValue("namaKost", informasiKost.nama_kost || "");
      setValue("jenisKost", informasiKost.jenis_kost || "");
      setValue("deskripsi", informasiKost.deskripsi || "");
      setValue("peraturan", informasiKost.peraturan || []);
    }
  }, [informasiKost, setValue]);

  useEffect(() => {
    setOnNext(
      handleSubmit((data: any) => {
        const formData = {
          nama_kost: data.namaKost,
          jenis_kost: data.jenisKost,
          deskripsi: data.deskripsi,
          peraturan: data.peraturan,
        };

        if (Object.keys(informasiKost).length === 0) {
          createKost(formData);
        } else {
          if (!kostId) return;
          const existingData = {
            nama_kost: informasiKost.nama_kost,
            jenis_kost: informasiKost.jenis_kost,
            deskripsi: informasiKost.deskripsi,
            peraturan: informasiKost.peraturan || [],
          };

          const isEqual =
            JSON.stringify(formData) === JSON.stringify(existingData);

          if (isEqual) {
            setCurrentStep(2);
            router.replace(`/dashboard/tambah-kost?kost_id=${kostId}&step=2`);
            return;
          }
          editKost(
            {
              kostId,
              data: formData,
            },
            {
              onSuccess: (res) => {
                setCurrentStep(res.data.progress_step);
                setInformasiKost({
                  nama_kost: res.data.nama_kost,
                  jenis_kost: res.data.jenis_kost,
                  deskripsi: res.data.deskripsi,
                  peraturan: res.data.peraturan,
                });

                router.replace(
                  `/dashboard/tambah-kost?kost_id=${kostId}&step=2`
                );
              },
            }
          );
        }
      })
    );
  }, [
    handleSubmit,
    setCurrentStep,
    setOnNext,
    currentStep,
    createKost,
    editKost,
    router,
    setValue,
    informasiKost,
    kostId,
  ]);

  const toggleRule = (ruleId: string) => {
    const currentRules = new Set(watch("peraturan") || []);
    if (currentRules.has(ruleId)) currentRules.delete(ruleId);
    else currentRules.add(ruleId);
    setValue("peraturan", Array.from(currentRules));
  };
  return (
    <>
      <form>
        <h1 className="font-semibold text-2xl mb-6">Lengkapi Data kost anda</h1>

        {/* Nama Kost */}
        <div className="mb-6 max-w-lg">
          <Label className="text-xl">Nama Kost</Label>
          <Input
            {...register("namaKost")}
            type="text"
            error={errors.namaKost ? true : false}
          />
          {errors.namaKost && (
            <p className="text-red-500 text-sm">{errors.namaKost.message}</p>
          )}

          <p className="text-sm text-[#7A7A7A] mt-1">
            Saran: Kost (spasi) Nama kost
          </p>
        </div>

        {/* Jenis Kost */}
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
        </div>

        {/* Deskripsi Kost */}
        <div className="mb-6 max-w-lg">
          <label
            htmlFor="deskripsiKost"
            className="block text-xl font-semibold mb-1 text-[#1A1A1A]"
          >
            Deskripsi Kost
          </label>
          <TextArea
            placeholder="Masukkan catatan tambahan"
            rows={5}
            {...register("deskripsi")}
            error={errors.deskripsi ? true : false}
          />
          {errors.deskripsi && (
            <p className="text-red-500 text-sm">{errors.deskripsi.message}</p>
          )}
        </div>

        {/* Peraturan Kost */}
        <div className="max-w-full">
          <div className="font-semibold text-xl mb-3 text-[#1A1A1A]">
            Peraturan Kost
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-2 text-base text-[#7A7A7A] ">
            {rules?.map((rule: any) => (
              <label
                key={rule._id}
                className="flex items-center gap-2 cursor-pointer text-sm min-w-[180px]"
              >
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={selectedRules.includes(rule._id)}
                  onChange={() => toggleRule(rule._id)}
                />
                {rule.nama_peraturan}
              </label>
            ))}
          </div>
        </div>
      </form>
    </>
  );
}
