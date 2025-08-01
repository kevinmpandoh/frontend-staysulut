import { Bed, Building2, Home } from "lucide-react";
import { usePreferenceStore } from "@/stores/preference.store";

export default function JenisKostStep() {
  const jenisKost = usePreferenceStore((state) => state.jenisKost);
  const setJenisKost = usePreferenceStore((state) => state.setJenisKost);

  const handleClick = (value: string) => {
    setJenisKost(value);
  };

  const options = [
    { label: "Putra", value: "Putra", icon: <Home /> },
    { label: "Putri", value: "Putri", icon: <Building2 /> },
    { label: "Campur", value: "Campur", icon: <Bed /> },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {options.map((item) => {
        const isSelected = jenisKost === item.value;

        return (
          <button
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={`border rounded-xl p-3 flex flex-col items-center transition
              ${
                isSelected
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white hover:bg-blue-50"
              }
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
