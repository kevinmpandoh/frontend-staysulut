"use client";

import { usePreferenceStore } from "@/stores/preference.store";
import { RULE_ICONS, DEFAULT_RULE_ICON } from "@/constants/rules";
import { cn } from "@/lib/utils";
import { useRules } from "@/hooks/useRules";

export default function KeamananStep() {
  const keamanan = usePreferenceStore((state) => state.keamanan);
  const setKeamanan = usePreferenceStore((state) => state.setKeamanan);
  const { rules, rulesLoading } = useRules();

  const toggle = (id: string) => {
    setKeamanan(
      keamanan.includes(id)
        ? keamanan.filter((x) => x !== id)
        : [...keamanan, id]
    );
  };

  if (rulesLoading) return <p>Memuat keamanan...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
      {rules.map((item: any) => {
        const isSelected = keamanan.includes(item._id);
        const Icon = RULE_ICONS[item.nama_peraturan]?.icon || DEFAULT_RULE_ICON;

        return (
          <button
            key={item._id}
            type="button"
            onClick={() => toggle(item._id)}
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
              {item.nama_peraturan}
            </span>
          </button>
        );
      })}
    </div>
  );
}
