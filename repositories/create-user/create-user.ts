import { getLocalStorage } from "@/utils/localStorage";
import axios from "axios";

interface UserInput {
  name: string;
  gender: "male" | "female";
  email: string;
  status: "active" | "inactive";
}

export const createUser = async (deps: UserInput) => {
  const { email, gender, name, status } = deps;
  const token = getLocalStorage("token");

  try {
    const response = await axios.post(
      "https://gorest.co.in/public/v2/users",
      {
        name: name,
        gender: gender,
        email: email,
        status: status,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("User created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user");
  }
};
