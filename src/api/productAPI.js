import axios from "axios";
import { APP_BASE_URL } from "./../configs/constants";

export const getAllProducts = async (
  limit,
  page,
  category,
  sort,
  rangePrice
) => {
  const res = await axios.get(
    // `${APP_BASE_URL}/api/v1/products?fields=name,price,discount,imageCover,color,gender`
    `${APP_BASE_URL}/api/v1/products?limit=${limit || 1000}&page=${
      page || 1
    }&sort=${sort || "createAt"}${
      category && category !== "all" ? `&category=${category}` : ""
    }&price[gte]=${rangePrice[0] || 0}&price[lte]=${rangePrice[1] || 2000000}`
  );
  return res.data;
};

export const getAllProductAdmin = async (token) => {
  const res = await axios.get(`${APP_BASE_URL}/api/v1/products/admin`, {
    headers: { Authorization: `${token}` },
  });
  return res.data;
};

export const getAllProductsByGender = async (
  gender,
  limit,
  page,
  category,
  sort,
  rangePrice
) => {
  const res = await axios.get(
    `${APP_BASE_URL}/api/v1/products?gender=${gender}&limit=${
      limit || 10000
    }&page=${page || 1}&sort=${sort || "createAt"}${
      category && category !== "all" ? `&category=${category}` : ""
    }${
      rangePrice &&
      `&price[gte]=${rangePrice[0] || 0}&price[lte]=${rangePrice[1] || 2000000}`
    }`
  );
  return res.data;
};
// api/v1/products?limit=3&sort=-discount
export const getAllProductsByDiscount = async (
  limit,
  page,
  category,
  sort,
  rangePrice
) => {
  const res = await axios.get(
    `${APP_BASE_URL}/api/v1/products?limit=${limit || 10000}&page=${
      page || 1
    }&sort=${sort}${
      category && category !== "all" ? `&category=${category}` : ""
    }${
      rangePrice &&
      `&price[gte]=${rangePrice[0] || 0}&price[lte]=${rangePrice[1] || 2000000}`
    }&discount[gt]=0`
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

export const getAllProductsByName = async (productName, limit, page) => {
  const res = await axios.get(
    `${APP_BASE_URL}/api/v1/products?name=${productName}&limit=${
      limit || 10000
    }&page=${page || 1}`
  );
  return res.data;
};

export const getAllProductsByNameAndGender = async (productName, gender) => {
  const res = await axios.get(
    // `${APP_BASE_URL}/api/v1/products?fields=name,price,discount,imageCover,color,gender`
    `${APP_BASE_URL}/api/v1/products?gender=${gender}&name=${productName}`
  );
  return res.data;
};

// {{URL}}api/v1/products/:id
export const getProductById = async (productId) => {
  const res = await axios.get(`${APP_BASE_URL}/api/v1/products/${productId}`);
  return res.data;
};
