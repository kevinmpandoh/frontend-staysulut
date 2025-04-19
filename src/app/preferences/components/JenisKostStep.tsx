import { Bed, Building2, Home } from "lucide-react";
import { usePreferenceStore } from "@/stores/preference.store";

export default function JenisKostStep() {
  const jenisKost = usePreferenceStore((state) => state.jenisKost);
  const setJenisKost = usePreferenceStore((state) => state.setJenisKost);

  const handleClick = (value: string) => {
    const isSelected = jenisKost.includes(value);

    if (isSelected) {
      setJenisKost(jenisKost.filter((j) => j !== value));
    } else {
      setJenisKost([...jenisKost, value]);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: "Putra", value: "Putra", icon: <Home /> },
        { label: "Putri", value: "Putri", icon: <Building2 /> },
        { label: "Campur", value: "Campur", icon: <Bed /> },
      ].map((item) => {
        const isSelected = jenisKost.includes(item.value);

        // Cek apakah harus disable
        const isPutraSelected = jenisKost.includes("Putra");
        const isPutriSelected = jenisKost.includes("Putri");
        const isCampurSelected = jenisKost.includes("Campur");

        const finalIsDisabled =
          (item.value === "Putra" && isPutriSelected) ||
          (item.value === "Putri" && isPutraSelected) ||
          (item.value === "Putra" && isPutriSelected && isCampurSelected) ||
          (item.value === "Putri" && isPutraSelected && isCampurSelected) ||
          (item.value === "Putri" && isCampurSelected && isPutraSelected) ||
          (item.value === "Putra" && isCampurSelected && isPutriSelected);

        return (
          <button
            key={item.value}
            onClick={() => handleClick(item.value)}
            disabled={finalIsDisabled}
            className={`border rounded-xl p-3 flex flex-col items-center transition
              ${
                isSelected
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white hover:bg-blue-50"
              }
              ${finalIsDisabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {item.icon}
            <span className="mt-1 text-sm">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
