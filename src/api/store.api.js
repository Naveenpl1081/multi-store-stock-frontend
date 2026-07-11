import axiosInstance from "./axiosInstance.js";

export const getStoresRequest = async () => {
const response = await axiosInstance.get("api/stores/");
return response.data.data;
};

export const createStoreRequest = async ({ name }) => {
const response = await axiosInstance.post("api/stores", { name });
return response.data.data;
};