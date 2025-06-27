// /app/owner/kosts/new/step-1/page.tsx
"use client";

import { Input } from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { DEFAULT_RULE_ICON, RULE_ICONS } from "@/constants/rules";
import { useKost } from "@/hooks/useKost";
import { useRules } from "@/hooks/useRules";
import { cn } from "@/lib/utils";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useEditKostModalStore } from "@/stores/editKostModal";
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

export default function StepInformasiKost() {
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

  const { rules, rulesLoading } = useRules();
  const { editKost } = useKost({});
  const router = useRouter();
  const { setIsSubmitSuccess } = useEditKostModalStore();

  const { currentStep, setCurrentStep, setOnNext, informasiKost, kostId } =
    useCreateKostStore();
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
    setCurrentStep(1);
    setOnNext(
      handleSubmit((data: any) => {
        const formData = {
          nama_kost: data.namaKost,
          jenis_kost: data.jenisKost,
          deskripsi: data.deskripsi,
          peraturan: data.peraturan,
        };

        if (!kostId) return;

        editKost(
          {
            kostId,
            data: formData,
          },
          {
            onSuccess: () => {
              setIsSubmitSuccess(true);
            },
          }
        );
      })
    );
  }, [
    handleSubmit,
    setCurrentStep,
    setOnNext,
    currentStep,
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
            {rulesLoading ? (
              <h1>Loading</h1>
            ) : (
              <>
                {rules.map((rule: any) => {
                  const isSelected = selectedRules.includes(rule._id);
                  const iconInfo = RULE_ICONS[rule.nama_peraturan];
                  const Icon = iconInfo?.icon || DEFAULT_RULE_ICON;

                  return (
                    <button
                      key={rule._id}
                      type="button"
                      onClick={() => toggleRule(rule._id)}
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
                        {rule.nama_peraturan}
                      </span>
                    </button>
                  );
                })}
              </>
            )}
          </div>
          {errors.peraturan && (
            <p className="text-red-500 text-sm mt-4">
              {errors.peraturan.message}
            </p>
          )}

          {/* <div className="flex flex-wrap gap-x-10 gap-y-2 text-base text-[#7A7A7A] ">
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
          </div> */}
        </div>
      </form>
    </>
  );
}
