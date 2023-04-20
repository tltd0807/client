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

export const updateProduct = async (token, data, productId) => {
  const res = await axios.patch(
    `${APP_BASE_URL}/api/v1/products/${productId}`,
    data,
    {
      headers: { Authorization: `${token}` },
      "Content-Type": "multipart/form-data",
    }
  );
  return res.data;
};

export const deleteProduct = async (token, productId) => {
  const res = await axios.delete(
    `${APP_BASE_URL}/api/v1/products/${productId}`,
    {
      headers: { Authorization: `${token}` },
    }
  );
  return res.data;
};

// {{URL}}api/v1/products?name=Dép Eva

export const getAllProductsByName = async (productName, gender) => {
  const res = await axios.get(
    // `${APP_BASE_URL}/api/v1/products?fields=name,price,discount,imageCover,color,gender`
    `${APP_BASE_URL}/api/v1/products?gender=${gender}&name=${productName}`
  );
  return res.data;
};

// {{URL}}api/v1/products/:id
export const getProductById = async (productId) => {
  const res = await axios.get(
    // `${APP_BASE_URL}/api/v1/products?fields=name,price,discount,imageCover,color,gender`
    `${APP_BASE_URL}/api/v1/products/${productId}`
  );
  return res.data;
};
