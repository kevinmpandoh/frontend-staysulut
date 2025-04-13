import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKost } from "@/services/kost.service";

export function useCreateKost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createKost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts"] });
    },
  });
}
