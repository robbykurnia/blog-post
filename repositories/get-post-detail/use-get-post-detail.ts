import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "./get-post-detail";

interface Deps {
  id: number;
}

export const useGetPostDetail = (deps: Deps) => {
  const { id } = deps;

  const { data, isLoading, error } = useQuery({
    queryKey: ["post-detail", id],
    queryFn: () => getPostDetail(id),
    enabled: id > -1,
  });

  return { data, isLoading, error };
};
