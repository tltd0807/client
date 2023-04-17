import axios from "axios";
import { APP_BASE_URL } from "./../configs/constants";

export const getAllProducts = async () => {
  const res = await axios.get(
    // `${APP_BASE_URL}/api/v1/products?fields=name,price,discount,imageCover,color,gender`
    `${APP_BASE_URL}/api/v1/products`
  );
  return res.data;
};

export const getAllCategory = async () => {
  const res = await axios.get(`${APP_BASE_URL}/api/v1/category`);
  return res.data;
};

export const createProduct = async (token, data) => {
  const res = await axios.post(`${APP_BASE_URL}/api/v1/products`, data, {
    headers: { Authorization: `${token}` },
    "Content-Type": "multipart/form-data",
  });
  return res.data;
};
