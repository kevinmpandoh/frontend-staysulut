// hooks/useKostQuery.ts
import { KostOwnerService } from "@/services/kostOwner.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePhotoKost = ({ kostId }: { kostId?: string }) => {
  const queryClient = useQueryClient();

  const {
    data: photoKost,
    isLoading: isLoadingPhoto,
    refetch,
  } = useQuery({
    queryKey: ["photo-kost", kostId],
    queryFn: () => KostOwnerService.getPhotoKost(kostId!),
    enabled: !!kostId,
  });

  const { mutateAsync: uploadPhoto, isPending: isUploading } = useMutation({
    mutationFn: ({
      kostId,
      formData,
    }: {
      kostId: string;
      formData: FormData;
    }) => KostOwnerService.uploadPhotoKost(kostId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo-kost", kostId] });
    },
  });

  const { mutateAsync: deletePhoto, isPending: isDeleting } = useMutation({
    mutationFn: ({ kostId, photoId }: { kostId: string; photoId: string }) =>
      KostOwnerService.deletePhotoKost(kostId, photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo-kost", kostId] });
    },
  });

  const { mutate: submitPhotoKost, isPending } = useMutation({
    mutationFn: ({ kostId }: { kostId: string }) =>
      KostOwnerService.submitPhotoKost(kostId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["photo-kost", "kost-create-form-data", kostId],
      });
    },
    onError: (err: any) => {
      console.log(err, "ERROR");
    },
  });

  return {
    photoKost,
    isLoadingPhoto,
    uploadPhoto,
    isUploading,
    deletePhoto,
    isDeleting,
    refetch,
    submitPhotoKost,
    isPending,
  };
};
