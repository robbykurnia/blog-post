import { DeletePostInput } from "@/models/posts";
import { getLocalStorage } from "@/utils/localStorage";
import axios from "axios";

export const deletePost = async (deps: DeletePostInput) => {
  const { postID } = deps;
  const token = getLocalStorage("token");

  try {
    const response = await axios.delete(
      `https://gorest.co.in/public/v2/posts/${postID}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
