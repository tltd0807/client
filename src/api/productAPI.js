import axios from "axios";
import { APP_BASE_URL } from "./../configs/constants";

export const getAllProducts = async () => {
  const res = await axios.get(
    `${APP_BASE_URL}/api/v1/products?fields=name,price,discount,imageCover,color,gender`
  );
  return res.data;
};
