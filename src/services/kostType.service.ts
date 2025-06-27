import api from "@/lib/axios";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const kostTypeService = {
  getKostOwner: async (): Promise<any> => {
    try {
      const response = await api.get(`/owner/kosts/`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  getDetailOwner: async (id: string): Promise<any> => {
    try {
      console.log(id, "IDNYA LIH");
      const response = await api.get(`/owner/kost-type/${id}`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  create: async (data: any): Promise<any> => {
    try {
      const response = await api.post(`/owner/kost-type/`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  edit: async (id: string, data: any): Promise<any> => {
    try {
      const response = await api.put(`/owner/kost-type/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  editKost: async (kostId: string, data: any): Promise<any> => {
    try {
      const response = await api.put(`/owner/kosts/${kostId}`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  createKostAddress: async (kostId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(`/owner/kosts/${kostId}/address`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  createFacilitiesKost: async (kostId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(
        `/owner/kosts/${kostId}/facilities`,
        data
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  createPhotoKost: async (kostId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(`/owner/kosts/${kostId}/photos`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  getPhotoKost: async (kostId: string): Promise<any> => {
    try {
      const response = await api.get(`/owner/kosts/${kostId}/photos`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  submitPhotoKost: async (kostId: string): Promise<any> => {
    try {
      const response = await api.post(`/owner/kosts/${kostId}/photos`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  uploadPhotoKost: async (kostId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(`/owner/kosts/${kostId}/upload`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  deletePhotoKost: async (kostId: string, photoId: string): Promise<any> => {
    try {
      const response = await api.delete(
        `/owner/kosts/${kostId}/photos/${photoId}`
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  deleteKostType: async (kostTypeId: string): Promise<any> => {
    try {
      const response = await api.delete(`/owner/kost-type/${kostTypeId}`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
