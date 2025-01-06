import axios from "axios";
import { getLocalStorage } from "@/utils/localStorage";

const API = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("token");

    // If token is present, add it to request's Authorization Header
    if (token) {
      if (config.headers) config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

export default API;
