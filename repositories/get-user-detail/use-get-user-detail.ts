import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "./get-user-detail";

interface Deps {
  id: number;
}

export const useGetUserDetail = (deps: Deps) => {
  const { id } = deps;

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserDetail(id),
    enabled: id > -1,
  });

  return { data, isLoading, error };
};
