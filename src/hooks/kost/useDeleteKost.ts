import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteKost } from "@/services/kost.service";

export function useDeleteKost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteKost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts"] });
    },
  });
}
