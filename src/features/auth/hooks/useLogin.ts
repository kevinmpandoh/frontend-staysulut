// src/features/auth/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type LoginPayload = {
  email: string;
  password: string;
  role: "tenant" | "owner";
};

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const response = await axios.post(`/api/auth/${data.role}/login`, {
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
  });
}
