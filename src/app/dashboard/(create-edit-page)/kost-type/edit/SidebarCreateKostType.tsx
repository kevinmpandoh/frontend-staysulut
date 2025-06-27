"use client";
import { useCreateKostStore } from "@/stores/createKost.store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const stepsGroup = [
  {
    title: "Tipe Kost",
    items: ["Informasi Tipe Kost", "Fasilitas Kamar", "Foto Kamar", "Harga"],
  },
];

export default function SidebarKostType({
  lastCompletedStep,
}: {
  lastCompletedStep: number;
}) {
  const { currentStep } = useCreateKostStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const kostId = searchParams.get("kost_id");
  const kostTypeId = searchParams.get("kost_type_id");

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

                const handleClick = () => {
                  if (!kostId) return;
                  router.push(
                    `?kost_id=${kostId}&kost_type_id=${kostTypeId}&step=${globalStep}`
                  );
                };

                return (
                  <li key={label}>
                    <button
                      onClick={handleClick}
                      className={`w-full flex items-center justify-between font-semibold text-left transition-opacity ${
                        isClickable
                          ? "text-black hover:opacity-80"
                          : "text-gray-400 opacity-60 cursor-default"
                      }`}
                    >
                      <span>{label}</span>
                      <div
                        className={`  text-base ${
                          isActive ? " text-primary" : " text-gray-600"
                        }`}
                      >
                        Edit
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
