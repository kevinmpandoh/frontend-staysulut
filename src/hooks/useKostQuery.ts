import { KostService } from "@/services/kost.service";
import { preferenceService } from "@/services/preference.service";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useKostList = () => {
  const searchParams = useSearchParams();

  // Convert search params to object
  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  return useQuery({
    queryKey: ["kosts", queryObject],
    queryFn: () => KostService.getKostList(queryObject),
  });
};

export const useKostRecomended = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["kosts", "recomended"],
    queryFn: async () => {
      if (!user || user.role !== "tenant") {
        // Belum login atau bukan tenant → ambil semua kost
        return KostService.getKostList({});
      }
      // Sudah login → cek preferensi
      const preferences = await preferenceService.getPreference();
      if (preferences) {
        return KostService.getKostRecomended(); // Ada preferensi → rekomendasi
      } else {
        return KostService.getKostList({}); // Tidak ada preferensi → semua kost
      }
    },
  });
};

export function useKostDetail(id: string) {
  return useQuery({
    queryKey: ["kost", id],
    queryFn: async () => {
      try {
        const res = await KostService.getKostTypeDetail(id);
        return res.data.data;
      } catch (error: any) {
        // Melempar error agar bisa ditangkap di komponen
        throw {
          status: error.response?.status,
          message: error.response?.data?.message || "Terjadi kesalahan",
        };
      }
    },
    enabled: !!id,
  });
}

export function useCreateKost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: KostService.createKost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts"] });
    },
  });
}

export function useUpdateKost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      KostService.updateKost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts"] });
    },
  });
}

export function useDeleteKost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => KostService.deleteKost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts"] });
    },
  });
}
