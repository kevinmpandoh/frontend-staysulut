import api from "@/lib/axios";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const ruleService = {
  getAll: async (): Promise<any> => {
    try {
      const response = await api.get(`/rules/`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
