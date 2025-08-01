"use client";

import { useState } from "react";
import { usePreferenceStore } from "@/stores/preference.store";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DEFAULT_FACILITY_ICON, FACILITY_ICONS } from "@/constants/facilities";

const MAX_DISPLAY = 6;

function FacilityGrid({
  title,
  data,
  selected,
  setSelected,
}: {
  title: string;
  data: any[];
  selected: string[];
  setSelected: (ids: string[]) => void;
}) {
  const [showAll, setShowAll] = useState(false);

  const toggle = (id: string) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id]
    );
  };

  const displayList = showAll ? data : data.slice(0, MAX_DISPLAY);

  return (
    <div className="mb-6">
      <h3 className="font-medium text-gray-700 mb-2">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
        {displayList.map((fasilitas) => {
          const isSelected = selected.includes(fasilitas._id);
          const iconInfo = FACILITY_ICONS[fasilitas.nama_fasilitas];
          const Icon = iconInfo?.icon || DEFAULT_FACILITY_ICON;

          return (
            <button
              key={fasilitas._id}
              type="button"
              onClick={() => toggle(fasilitas._id)}
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
                {fasilitas.nama_fasilitas}
              </span>
            </button>
          );
        })}
      </div>

      {data.length > MAX_DISPLAY && (
        <div className="mt-3">
          <Button
            type="button"
            variant="ghost"
            className="text-sm text-blue-600"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Sembunyikan" : "Lihat Semua"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function FasilitasStep({ data, isLoading }: any) {
  const kostFacility = usePreferenceStore((state) => state.kostFacilities);
  const setKostFacility = usePreferenceStore(
    (state) => state.setKostFacilities
  );
  const roomFacility = usePreferenceStore((state) => state.roomFacilities);
  const setRoomFacility = usePreferenceStore(
    (state) => state.setRoomFacilities
  );

  if (isLoading) return <p>Loading fasilitas...</p>;
  if (!data) return <p>Gagal memuat fasilitas</p>;

  const fasilitasKostList = data.filter((f: any) => f.kategori === "kost");
  const fasilitasKamarList = data.filter((f: any) => f.kategori === "kamar");

  return (
    <>
      <FacilityGrid
        title="Fasilitas Kost"
        data={fasilitasKostList}
        selected={kostFacility}
        setSelected={setKostFacility}
      />

      <FacilityGrid
        title="Fasilitas Kamar"
        data={fasilitasKamarList}
        selected={roomFacility}
        setSelected={setRoomFacility}
      />
    </>
  );
}
