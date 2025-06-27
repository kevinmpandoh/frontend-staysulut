import { KostOwnerService } from "@/services/kostOwner.service";
import { kostTypeService } from "@/services/kostType.service";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useKostType = ({ kostTypeId }: { kostTypeId?: string }) => {
  const queryClient = useQueryClient();
  const { setFacilitiesKostType } = useCreateKostStore();

  const {
    data: getKostTypeOwner,
    isLoading: loadingKostTypeOwner,
    error: errorKostType,
    isError,
    refetch: refetchKostTypeOwner,
  } = useQuery({
    queryKey: ["kost-type", kostTypeId],
    queryFn: () => kostTypeService.getDetailOwner(kostTypeId!),
    enabled: !!kostTypeId,
  });

  const { mutateAsync: create, isPending: isCreating } = useMutation({
    mutationFn: ({ data }: { data: any }) => kostTypeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kost-type", kostTypeId] });
    },
  });
  const { mutateAsync: edit, isPending: isEditing } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      kostTypeService.edit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kost-type", kostTypeId],
      });
    },
  });

  const { mutate: saveFacilities, isPending: savingFacilities } = useMutation({
    mutationFn: ({ kostTypeId, data }: { kostTypeId: string; data: any }) =>
      KostOwnerService.createFacilitiesKostType(kostTypeId, data),
    onSuccess: (res) => {
      setFacilitiesKostType(res.data.fasilitas.map((f: any) => f.fasilitas));
      queryClient.invalidateQueries({
        queryKey: ["kost-type", kostTypeId],
      });
    },
  });

  const { mutate: saveKostTypePrice, isPending: savingKostTypePrice } =
    useMutation({
      mutationFn: ({ kostTypeId, data }: { kostTypeId: string; data: any }) =>
        KostOwnerService.createKostTypePrice(kostTypeId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["kost-type", kostTypeId],
        });
      },
    });

  return {
    getKostTypeOwner,
    loadingKostTypeOwner,
    errorKostType,
    refetchKostTypeOwner,
    isError,
    create,
    isCreating,
    edit,
    isEditing,
    saveFacilities,
    savingFacilities,
    saveKostTypePrice,
    savingKostTypePrice,
  };
};
