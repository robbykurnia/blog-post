import axios from "axios";

export const getPosts = async (page: number, pageSize: number) => {
  const response = await axios.get(
    `https://gorest.co.in/public/v1/posts?page=${page}&per_page=${pageSize}`
  );
  return response.data;
};
