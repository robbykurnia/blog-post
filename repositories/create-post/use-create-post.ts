import { useMutation } from "@tanstack/react-query";
import { createPost } from "./create-post";

export const useCreatePost = () => {
  const createPostMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPost,
  });

  return createPostMutation;
};
