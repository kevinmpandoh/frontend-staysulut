"use client";

import { usePreferenceModalStore } from "@/stores/preferenceModal.store";
import EditPreferenceModal from "./EdiPreferenceModal";
import { Pencil } from "lucide-react";
import { usePreference } from "@/hooks/usePreference";

export default function PreferensiPengguna() {
  const { openModal } = usePreferenceModalStore();

  const { tenantPreference, isLoading } = usePreference();

  if (isLoading) return <h1> Loading...</h1>;

  // Dummy data preferensi pengguna
  const preferensi = {
    lokasi: "Jakarta Selatan",
    jenisKost: "Putri",
    harga: "Rp1.000.000",
    fasilitas: ["WiFi", "AC", "Kamar Mandi Dalam"],
    keamanan: ["CCTV", "Security 24 Jam"],
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold">Lokasi Preferensi</h2>

        <button
          onClick={() => openModal("lokasi")}
          className="bg-[#E0E7FF] rounded-full p-2 hover:bg-[#C7D2FE] transition"
        >
          <Pencil size={18} className="text-[#4338CA]" />
        </button>
      </div>
      <p>{preferensi.lokasi}</p>

      <div className="flex justify-between items-center border-b pb-2 pt-4">
        <h2 className="text-lg font-semibold">Harga</h2>

        <button
          onClick={() => openModal("harga")}
          className="bg-[#E0E7FF] rounded-full p-2 hover:bg-[#C7D2FE] transition"
        >
          <Pencil size={18} className="text-[#4338CA]" />
        </button>
      </div>
      <p>Rp {tenantPreference.harga.toLocaleString("id-ID")}</p>

      <div className="flex justify-between items-center border-b pb-2 pt-4">
        <h2 className="text-lg font-semibold">Jenis Kost</h2>

        <button
          onClick={() => openModal("jenis_kost")}
          className="bg-[#E0E7FF] rounded-full p-2 hover:bg-[#C7D2FE] transition"
        >
          <Pencil size={18} className="text-[#4338CA]" />
        </button>
      </div>
      <p>{preferensi.jenisKost}</p>

      <div className="flex justify-between items-center border-b pb-2 pt-4">
        <h2 className="text-lg font-semibold">Fasilitas</h2>

        <button
          onClick={() => openModal("fasilitas")}
          className="bg-[#E0E7FF] rounded-full p-2 hover:bg-[#C7D2FE] transition"
        >
          <Pencil size={18} className="text-[#4338CA]" />
        </button>
      </div>
      <ul className="list-disc list-inside">
        {tenantPreference.fasilitas.map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <div className="flex justify-between items-center border-b pb-2 pt-4">
        <h2 className="text-lg font-semibold">Keamanan</h2>

        <button
          onClick={() => openModal("keamanan")}
          className="bg-[#E0E7FF] rounded-full p-2 hover:bg-[#C7D2FE] transition"
        >
          <Pencil size={18} className="text-[#4338CA]" />
        </button>
      </div>
      <ul className="list-disc list-inside">
        {preferensi.keamanan.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      {/* Modal untuk edit preferensi */}
      <EditPreferenceModal />
    </div>
  );
}
