import { client } from "../config/axios";

export const registerUser = async (registerRequest) => {
  return client.post("/auth/register", registerRequest);
};
export const loginUser = async (loginRequest) => {
  return client.post("/auth/log-in", loginRequest, {
    withCredentials: false,
  });
};

export const logOutUser = async () => {
  return client.get("/auth/log-out");
};
