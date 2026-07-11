import axiosInstance from "./axiosInstance.js";

export const registerRequest = async ({ username, email, password }) => {
  const response = await axiosInstance.post("api/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginRequest = async ({ email, password }) => {
  const response = await axiosInstance.post("api/auth/login", {
    email,
    password,
  });
  console.log("s",response)
  return response.data.data;
};