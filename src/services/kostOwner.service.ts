import api from "@/lib/axios";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const KostOwnerService = {
  getKostOwner: async (): Promise<any> => {
    try {
      const response = await api.get(`/owner/kosts/`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  createKost: async (data: any): Promise<any> => {
    try {
      const response = await api.post(`/owner/kosts/`, data);
      return response.data;
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
      return response.data.data;
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
  createFacilitiesKostType: async (
    kostTypeId: string,
    data: any
  ): Promise<any> => {
    try {
      const response = await api.post(
        `/owner/kost-type/${kostTypeId}/facilities`,
        data
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  createKostTypePrice: async (kostTypeId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(
        `/owner/kost-type/${kostTypeId}/price`,
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
  getPhotoRoom: async (kostId: string): Promise<any> => {
    try {
      const response = await api.get(`/owner/kost-type/${kostId}/photos`);
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
  submitPhotoRoom: async (kostTypeId: string): Promise<any> => {
    try {
      const response = await api.post(`/owner/kost-type/${kostTypeId}/photos`);
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
  uploadPhotoRoom: async (kostTypeId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(
        `/owner/kost-type/${kostTypeId}/upload`,
        data
      );
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
  deletePhotoRoom: async (
    kostTypeId: string,
    photoId: string
  ): Promise<any> => {
    try {
      const response = await api.delete(
        `/owner/kost-type/${kostTypeId}/photos/${photoId}`
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
