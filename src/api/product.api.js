import axiosInstance from "./axiosInstance.js";

export const getProductsRequest = async () => {
const response = await axiosInstance.get("api/products/");
return response.data.data;
};


export const createProductRequest = async ({ name, sku }) => {
const response = await axiosInstance.post("api/products/", { name, sku });
return response.data.data;

};

