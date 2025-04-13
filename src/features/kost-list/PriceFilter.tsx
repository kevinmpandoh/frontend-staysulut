"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  min: string;
  max: string;
  onChange: (key: "min" | "max", value: string) => void;
}

// Helper untuk format angka ke IDR
const formatCurrency = (value: string | number) => {
  const number = typeof value === "string" ? parseInt(value) : value;
  if (isNaN(number)) return "";
  return number.toLocaleString("id-ID");
};

// Parse angka dari string dengan titik
const parseCurrency = (formatted: string) => {
  return formatted.replace(/[^\d]/g, "");
};

// Preset pilihan populer
const presets = [
  { label: "< Rp 200rb", min: "0", max: "200000" },
  { label: "< Rp 500rb", min: "0", max: "500000" },
  { label: "Rp 500rb - Rp 1jt", min: "500000", max: "1000000" },
  { label: "> Rp 1jt", min: "1000000", max: "10000000" },
];

export default function PriceFilter({ min, max, onChange }: Props) {
  const handlePresetClick = (minVal: string, maxVal: string) => {
    onChange("min", minVal);
    onChange("max", maxVal);
  };

  return (
    <div className="space-y-6">
      <label className="font-semibold text-base block">
        Rentang Harga (per bulan)
      </label>

      <div className="flex items-center gap-2">
        {[
          ["min", min],
          ["max", max],
        ].map(([key, value]) => (
          <div key={key} className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-md font-semibold text-muted-foreground">
              Rp
            </span>
            <Input
              type="text"
              inputMode="numeric"
              value={formatCurrency(value)}
              onChange={(e) => {
                const raw = parseCurrency(e.target.value);
                onChange(key as "min" | "max", raw);
              }}
              className="pl-12 py-6 text-5xl font-semibold"
              placeholder={key === "min" ? "Minimal" : "Maksimal"}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <label className="text-md font-semibold">
          Rentang harga yang sering dipakai
        </label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {presets.map((preset) => {
            const isActive = min === preset.min && max === preset.max;

            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePresetClick(preset.min, preset.max)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm border transition",
                  isActive
                    ? "bg-blue-50 text-blue-600 border-blue-500"
                    : "bg-white text-muted-foreground border"
                )}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
