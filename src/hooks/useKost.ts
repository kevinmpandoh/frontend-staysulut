// hooks/useKostQuery.ts
import { useRouter, useSearchParams } from "next/navigation";

export const useKostQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQuery = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    router.push(`/kost?${params.toString()}`);
  };

  const resetQuery = () => {
    router.push("/kost");
  };

  return {
    query: searchParams,
    setQuery,
    resetQuery,
  };
};
