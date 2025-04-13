// hooks/useKostList.ts
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getKostList } from "@/services/kost.service";

export const useKostList = () => {
  const searchParams = useSearchParams();

  // Convert search params to object
  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  return useQuery({
    queryKey: ["kosts", queryObject],
    queryFn: () => getKostList(queryObject),
  });
};
