"use client";
// hooks/useWishlist.ts
import { useQuery } from "@tanstack/react-query";

import { roomService } from "@/services/room.service";

export const useRoom = (kostTypeId: string) => {
  const { data: getRoomsByKostType, isLoading } = useQuery({
    queryKey: ["rooms"], // supaya cache terpisah berdasarkan status
    queryFn: () => roomService.getRoomsByKostType(kostTypeId),
    enabled: !!kostTypeId,
  });
  const { data: getAvaibleRooms, isLoading: getting } = useQuery({
    queryKey: ["rooms"], // supaya cache terpisah berdasarkan status
    queryFn: () => roomService.getRoomsByKostType(kostTypeId, "Tersedia"),
    enabled: !!kostTypeId,
  });

  return {
    getRoomsByKostType,
    isLoading,
    getAvaibleRooms,
    getting,
  };
};
