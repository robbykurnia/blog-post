import { useMutation } from "@tanstack/react-query";
import { createUser } from "./create-user";

export const useCreateUser = () => {
  const createUserMutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,
  });

  return createUserMutation;
};
