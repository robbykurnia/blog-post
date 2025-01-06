import axios from "axios";

export const getPostDetail = async (id: number) => {
  const response = await axios.get(
    `https://gorest.co.in/public/v1/posts/${id}`
  );
  return response.data;
};
