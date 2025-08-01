"use client";

import { preferenceService } from "@/services/preference.service";
import { usePreferenceStore } from "@/stores/preference.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePreference = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    location,
    price,
    jenisKost,
    kostFacilities,
    roomFacilities,
    keamanan,
    reset,
  } = usePreferenceStore();
  const { data: tenantPreference, isLoading } = useQuery({
    queryKey: ["kosts", "preference"], // supaya cache terpisah berdasarkan status
    queryFn: preferenceService.getPreference,
  });

  const { mutate: savePreferences, isPending: savingPreferences } = useMutation(
    {
      mutationFn: () =>
        preferenceService.createOrUpdatePreference({
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
          price: {
            min: price.min,
            max: price.max,
          },
          jenis_kost: jenisKost,
          kostFacilities,
          roomFacilities,
          rules: keamanan,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["kosts", "preference"] });
        reset();
        router.push("/kosts");
      },
      onError: (error) => {
        console.error("Gagal menyimpan preferensi:", error);
      },
    }
  );

  const { mutate: updatePreference, isPending: isUpdate } = useMutation({
    mutationFn: preferenceService.createOrUpdatePreference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts", "preference"] });
    },
    onError: (error) => {
      console.error("Gagal menyimpan preferensi:", error);
    },
  });

  return {
    tenantPreference,
    isLoading,
    savePreferences,
    savingPreferences,
    updatePreference,
    isUpdate,
  };
};
