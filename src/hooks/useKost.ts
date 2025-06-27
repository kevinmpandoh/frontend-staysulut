// hooks/useKostQuery.ts
"use client";

import { KostService } from "@/services/kost.service";
import { KostOwnerService } from "@/services/kostOwner.service";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export const useKost = ({ kostId }: { kostId?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { setCurrentStep, setInformasiKost, setAlamatKost, setFacilitiesKost } =
    useCreateKostStore();

  const setQuery = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    router.push(`/kost?${params.toString()}`);
  };

  const resetQuery = () => {
    router.push("/kost");
  };

  // ✅ Kost owner list (dashboard awal)
  const { data: kostOwner, isLoading: loadingKostOwner } = useQuery({
    queryKey: ["kost-owner", "list"],
    queryFn: () => KostService.getKostOwner(),
  });

  // ✅ Detail kost (info untuk ditampilkan)
  const {
    data: detailKost,
    isLoading: loadingDetailKost,
    isError,
  } = useQuery({
    queryKey: ["kost", kostId, "detail"],
    queryFn: () => KostService.getKostDetail(kostId!),
    enabled: !!kostId,
  });

  // ✅ Data kost untuk create/edit (step form)
  const {
    data: getKostCreate,
    isLoading: loadingKostCreate,
    error: errorDetailKost,
  } = useQuery({
    queryKey: ["kost", kostId, "create"],
    queryFn: () => KostService.getKostCreate(kostId!),
    enabled: !!kostId,
  });

  const { mutate: createKost, isPending: createKostLoading } = useMutation({
    mutationFn: KostOwnerService.createKost,
    onSuccess: (res) => {
      setCurrentStep(res.data.progress_step);
      setInformasiKost({
        nama_kost: res.data.nama_kost,
        jenis_kost: res.data.jenis_kost,
        deskripsi: res.data.deskripsi,
        peraturan: res.data.peraturan,
      });
      router.replace(`/dashboard/tambah-kost?kost_id=${res.data._id}&step=2`);
      queryClient.invalidateQueries({
        queryKey: ["kost", res.data._id, "create"],
      });
    },
  });

  const { mutate: editKost, isPending: editKostLoading } = useMutation({
    mutationFn: ({ kostId, data }: { kostId: string; data: any }) =>
      KostOwnerService.editKost(kostId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kost", kostId, "detail"],
      });
    },
  });

  const { mutate: createAddress, isPending: createAddressLoading } =
    useMutation({
      mutationFn: ({ kostId, data }: { kostId: string; data: any }) =>
        KostOwnerService.createKostAddress(kostId, data),
      onSuccess: (res) => {
        setAlamatKost({
          provinsi: res.address.provinsi,
          kabupaten_kota: res.address.kabupaten_kota,
          kecamatan: res.address.kecamatan,
          detail_alamat: res.address.detail_alamat,
          koordinat: {
            lat: res.address.koordinat.lat,
            lng: res.address.koordinat.lng,
          },
        });

        queryClient.invalidateQueries({
          queryKey: ["kost", kostId, "detail"],
        });
      },
    });

  const { mutate: saveFacilities, isPending: savingFacilities } = useMutation({
    mutationFn: ({ kostId, data }: { kostId: string; data: any }) =>
      KostOwnerService.createFacilitiesKost(kostId, data),
    onSuccess: (res) => {
      setFacilitiesKost(res.data.fasilitas.map((f: any) => f.fasilitas));
      queryClient.invalidateQueries({
        queryKey: ["kost", kostId, "detail"],
      });
    },
  });

  return {
    query: searchParams,
    setQuery,
    resetQuery,
    kostOwner,
    loadingKostOwner,
    createKost,
    createKostLoading,
    editKost,
    editKostLoading,
    detailKost,
    getKostCreate,
    loadingKostCreate,
    errorDetailKost,
    isError,
    loadingDetailKost,
    createAddress,
    createAddressLoading,
    saveFacilities,
    savingFacilities,
  };
};
