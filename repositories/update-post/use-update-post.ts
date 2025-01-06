import { useMutation } from "@tanstack/react-query";
import { updatePost } from "./update-post";

export const useUpdatePost = () => {
  const updatePostMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePost,
  });

  return updatePostMutation;
};
