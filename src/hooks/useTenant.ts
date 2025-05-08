"use client";

import { tenantService } from "@/services/tenant.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTenant = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  const { mutate: updateProfile, isPending: updatetingProfile } = useMutation({
    mutationFn: tenantService.updateTenantCurrent,
    onSuccess: (res) => {
      setUser(res.data);
      queryClient.invalidateQueries({ queryKey: ["currentTenant"] });
    },
  });

  const { mutate: changePassword, isPending: isChanging } = useMutation({
    mutationFn: tenantService.changePassword,
    onSuccess: () => {
      toast.success("Password berhasil diubah");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal mengubah password");
    },
  });

  return {
    updateProfile,
    updatetingProfile,
    changePassword,
    isChanging,
  };
};
