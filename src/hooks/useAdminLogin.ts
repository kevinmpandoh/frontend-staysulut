import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: AuthService.loginAdmin,
  });
};
