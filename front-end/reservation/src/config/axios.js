import axios from "axios";

export const client = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080",
});
client.interceptors.response.use((response) => {
  return response;
});
