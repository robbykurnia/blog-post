import { useQuery } from "@tanstack/react-query";

import type { PostsData } from "@/models/posts";
import { getPosts } from "./get-posts";

interface Deps {
  page: number;
  pageSize: number;
}

export const useGetPosts = (deps: Deps) => {
  const { page, pageSize } = deps;

  const { data, isLoading, error, isFetching, refetch } = useQuery<PostsData>({
    queryKey: ["posts", page, pageSize],
    queryFn: () => getPosts(page, pageSize),
    placeholderData: (prev) => prev,
  });

  return { data, isLoading: isFetching, error, refetch };
};
