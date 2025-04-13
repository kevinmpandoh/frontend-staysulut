import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateKost } from "@/services/kost.service";

export function useUpdateKost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateKost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts"] });
    },
  });
}
