"use client";

import { adminService } from "@/services/admin.service";
import { useAuthStore } from "@/stores/auth.store";
import { User } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();

  const getCurrentAdmin = useQuery({
    queryKey: ["adminCurrent"], // supaya cache terpisah berdasarkan status
    queryFn: () => adminService.getAdminCurrent(),
  });

  const { mutate: changePassword, isPending: isChanging } = useMutation({
    mutationFn: adminService.changePassword,
    onSuccess: () => {
      toast.success("Password berhasil diubah");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal mengubah password");
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!user?.id) throw new Error("User tidak ditemukan");
      const formData = new FormData();
      formData.append("photo_profile", file);
      formData.append("adminId", user.id); // ⬅️ tambahkan tenantId ke form

      const response = await adminService.uploadProfile(formData);
      return response;
    },
    onSuccess: (data) => {
      if (data?.url) {
        // Update state user
        setUser({ ...user, foto_profile: data.url } as User);
        // Optionally, refetch profile data
      }
      queryClient.invalidateQueries({ queryKey: ["adminCurrent"] });
    },
    onError: (err) => {
      console.error("Upload gagal:", err);
    },
  });

  return {
    changePassword,
    isChanging,
    getCurrentAdmin,
    uploadPhoto: uploadPhotoMutation,
  };
};
