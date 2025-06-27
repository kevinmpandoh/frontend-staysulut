// import { Wishlist } from "@/types/wishlist.type";
import api from "@/lib/axios";

export const addToWishlist = async (kostId: string) => {
  const res = await api.post(`/tenant/wishlist`, { kost_type: kostId });
  return res.data;
};

export const removeFromWishlist = async (kostId: string) => {
  const res = await api.delete(`/tenant/wishlist/${kostId}`);
  return res.data;
};

export const getWishlist = async () => {
  const res = await api.get(`/tenant/wishlist`);
  return res.data;
};

export const isWishlisted = async (kostId: string) => {
  const res = await api.get(`/tenant/wishlist/${kostId}`);
  return res.data; // asumsi { isWishlisted: true/false }
};
