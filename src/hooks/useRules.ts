import { ruleService } from "@/services/rules.service";
import { useQuery } from "@tanstack/react-query";

export const useRules = () => {
  const { data: rules, isLoading: rulesLoading } = useQuery({
    queryKey: ["rules"], // supaya cache terpisah berdasarkan status
    queryFn: ruleService.getAll,
  });

  return {
    rules,
    rulesLoading,
  };
};
