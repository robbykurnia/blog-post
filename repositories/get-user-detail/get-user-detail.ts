import axios from "axios";

export const getUserDetail = async (id: number) => {
  const link = `https://gorest.co.in/public/v1/users/${id}`;
  const response = await axios.get(
    `https://gorest.co.in/public/v1/users/6945143`
  );
  return response.data;
};
