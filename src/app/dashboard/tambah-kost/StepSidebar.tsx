"use client";
import { useCreateKostStore } from "@/stores/createKost.store";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const stepsGroup = [
  {
    title: "Kost",
    items: ["Informasi Kost", "Alamat Kost", "Fasilitas Kost", "Foto Kost"],
  },
  {
    title: "Tipe Kost",
    items: ["Informasi Tipe Kost", "Fasilitas Kamar", "Foto Kamar", "Harga"],
  },
];

export default function StepSidebar({
  lastCompletedStep,
}: {
  lastCompletedStep: number;
}) {
  const { currentStep } = useCreateKostStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const kostId = searchParams.get("kost_id");

  return (
    <aside className="bg-[#E3E6F9] w-[320px] min-h-screen flex flex-col px-8 py-12 select-none">
      <div className="flex justify-center">
        <Image
          src={"/logos/Logo-Stay-Kost.svg"}
          alt="Logo Stay Kost"
          width={120}
          height={120}
        />
      </div>
      <nav className="flex flex-col gap-8 text-lg font-normal leading-5">
        {stepsGroup.map((group, groupIndex) => (
          <div key={groupIndex}>
            <p className="font-semibold text-[#5F6D7E] mb-4 mt-8">
              {group.title}
            </p>
            <ul className="flex flex-col gap-8">
              {group.items.map((label, stepIndex) => {
                const globalStep =
                  groupIndex === 0 ? stepIndex + 1 : stepIndex + 5;

                const isActive = globalStep === currentStep;

                const isClickable = globalStep <= lastCompletedStep;
                const isCompleted =
                  globalStep < currentStep ||
                  (globalStep <= lastCompletedStep &&
                    globalStep !== currentStep);

                const handleClick = () => {
                  if (!kostId || !isClickable) return;
                  router.push(
                    `/dashboard/tambah-kost?kost_id=${kostId}&step=${globalStep}`
                  );
                };

                return (
                  <li key={label}>
                    <button
                      onClick={handleClick}
                      disabled={!isClickable}
                      className={`w-full flex items-center justify-between font-semibold text-left transition-opacity ${
                        isClickable
                          ? "text-black hover:opacity-80"
                          : "text-gray-400 opacity-60 cursor-default"
                      }`}
                    >
                      <span>{label}</span>
                      <div
                        className={`flex items-center justify-center w-5.5 h-5.5 rounded-full border-2 ml-2 shrink-0 ${
                          isCompleted
                            ? "bg-[#4F5BD5] border-[#4F5BD5] text-white"
                            : isActive
                            ? "border-[#4F5BD5] text-primary"
                            : "border-gray-400 text-gray-400"
                        }`}
                      >
                        <Check
                          size={13}
                          className={
                            isCompleted
                              ? ""
                              : isActive
                              ? "text-[#4F5BD5]"
                              : "text-gray-400"
                          }
                          strokeWidth={4}
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
