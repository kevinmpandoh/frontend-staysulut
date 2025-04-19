import { useQuery } from "@tanstack/react-query";
import { getFacilities } from "@/services/facilities.service";

export const useFacilities = () => {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: getFacilities,
  });
};
