import { PreferenceService } from "@/services/preference.service";
import { usePreferenceStore } from "@/stores/preference.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSavePreferences = () => {
  const router = useRouter();
  const { location, price, jenisKost, kostFacilities, roomFacilities, reset } =
    usePreferenceStore();

  const mutation = useMutation({
    mutationFn: () =>
      PreferenceService.createPreference({
        lokasi: {
          type: location?.via,
          provinsi: location?.provinsi,
          kabupaten_kota: location?.kabupaten,
          kecamatan: location?.kecamatan,
          koordinat: {
            lat: location?.lat,
            lng: location?.lng,
          },
        },
        price,
        jenis_kost: jenisKost,
        fasilitas: [...kostFacilities, ...roomFacilities],
      }),
    onSuccess: () => {
      reset();
      router.push("/kosts");
    },
    onError: (error) => {
      console.error("Gagal menyimpan preferensi:", error);
    },
  });

  return mutation;
};

export const useGetPreference = () => {
  return useQuery({
    queryKey: ["kosts", "preference"],
    queryFn: () => PreferenceService.getPreference(),
  });
};
