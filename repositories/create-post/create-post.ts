import { CreatePostInput } from "@/models/posts";
import { getLocalStorage } from "@/utils/localStorage";
import axios from "axios";

export const createPost = async (deps: CreatePostInput) => {
  const { body, title } = deps;
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");

  console.log({ user });

  try {
    const response = await axios.post(
      "https://gorest.co.in/public/v2/posts",
      {
        user_id: user.id, // Ganti dengan ID user yang valid
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
