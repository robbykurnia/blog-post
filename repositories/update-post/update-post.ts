import { UpdatePostInput } from "@/models/posts";
import { getLocalStorage } from "@/utils/localStorage";
import axios from "axios";

export const updatePost = async (deps: UpdatePostInput) => {
  const { postID, body, title } = deps;
  const token = getLocalStorage("token");

  try {
    const response = await axios.put(
      `https://gorest.co.in/public/v2/posts/${postID}`,
      {
        title: title,
        body: body,
      },
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
