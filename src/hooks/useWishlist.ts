// hooks/useWishlist.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  isWishlisted,
} from "@/services/wishlist.service";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { useLoginModal } from "@/stores/loginModal.store";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: isLoggedIn,
  });

  const { mutate: add, isPending: adding } = useMutation({
    mutationFn: addToWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Ditambahkan ke wishlist");
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        useLoginModal.getState().open();
        // toast.error("Silakan login untuk menambahkan ke wishlist.");
        // opsional: redirect ke login
        // router.push("/login");
      } else {
        toast.error("Gagal menambahkan ke wishlist.");
      }
    },
  });

  const { mutate: remove, isPending: removing } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Dihapus dari wishlist");
    },
  });

  return {
    wishlist,
    isLoading,
    addToWishlist: add,
    removeFromWishlist: remove,
    adding,
    removing,
  };
};

export const useIsWishlisted = (kostId: string) => {
  return useQuery({
    queryKey: ["wishlist", kostId],
    queryFn: () => isWishlisted(kostId),
  });
};
