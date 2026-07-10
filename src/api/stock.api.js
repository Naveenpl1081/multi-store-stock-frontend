import axiosInstance from "./axiosInstance.js";

export const getStockRequest = async ({ threshold } = {}) => {
  const params = {};
  if (threshold !== undefined && threshold !== "") {
    params.threshold = threshold;
  }
  const response = await axiosInstance.get("api/stock", { params });
  return response.data;
};

export const adjustStockRequest = async ({ productId, storeId, delta }) => {
  const response = await axiosInstance.post("api/stock/adjust", {
    productId,
    storeId,
    delta,
  });
  return response.data;
};

export const transferStockRequest = async ({
  productId,
  fromStoreId,
  toStoreId,
  quantity,
}) => {
  const response = await axiosInstance.post("api/stock/transfer", {
    productId,
    fromStoreId,
    toStoreId,
    quantity,
  });
  return response.data;
};