import { create } from "zustand";

interface LocationData {
  via: "address" | "map";
  provinsi_id?: string;
  provinsi?: string;
  kabupaten_id?: string;
  kabupaten?: string;
  kecamatan_id?: string;
  kecamatan?: string;
  detail?: string;
  lat?: number;
  lng?: number;
}

interface PreferenceState {
  step: number;
  location: LocationData | null;
  price: string;
  jenisKost: string[]; // bisa lebih dari satu
  kostFacilities: string[];
  roomFacilities: string[];
  setStep: (step: number) => void;
  setLocation: (location: LocationData) => void;
  setPrice: (price: string) => void;
  setJenisKost: (jenis: string[]) => void;
  setKostFacilities: (facility: string[]) => void;
  setRoomFacilities: (facility: string[]) => void;
  reset: () => void;
}

export const usePreferenceStore = create<PreferenceState>((set) => ({
  step: 0,
  location: null,
  price: "",
  jenisKost: [],
  kostFacilities: [],
  roomFacilities: [],
  setStep: (step) => set({ step }),
  setLocation: (location) => set({ location }),
  setPrice: (price) => set({ price }),
  setJenisKost: (jenis) => set({ jenisKost: jenis }),
  setKostFacilities: (facility) => set({ kostFacilities: facility }),
  setRoomFacilities: (facility) => set({ roomFacilities: facility }),
  reset: () =>
    set({
      step: 0,
      location: null,
      price: "",
      jenisKost: [],
      kostFacilities: [],
      roomFacilities: [],
    }),
}));
