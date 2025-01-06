import { useMutation } from "@tanstack/react-query";
import { deletePost } from "./delete-post";

export const useDeletePost = () => {
  const deletePostMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePost,
  });

  return deletePostMutation;
};
