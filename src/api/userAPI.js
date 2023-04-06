import axios from "axios";
import { APP_BASE_URL } from "./../configs/constants";

export const getAllUser = async (token) => {
  const res = await axios.get(`${APP_BASE_URL}/api/v1/users`, {
    headers: { Authorization: `${token}` },
  });
  return res.data;
};

export const getCurrentUser = async (token) => {
  const res = await axios.get(`${APP_BASE_URL}/api/v1/users/me`, {
    headers: { Authorization: `${token}` },
  });
  return res.data;
};

export const getUserByEmail = async (token, data) => {
  const res = await axios.post(`${APP_BASE_URL}/api/v1/users`, data, {
    headers: { Authorization: `${token}` },
  });
  return res.data;
};

export const getUserById = async (token, userId) => {
  const res = await axios.get(`${APP_BASE_URL}/api/v1/users/${userId}`, {
    headers: { Authorization: `${token}` },
  });
  return res.data;
};

export const lockUser = async (token, userId) => {
  const res = await axios.delete(`${APP_BASE_URL}/api/v1/users/${userId}`, {
    headers: { Authorization: `${token}` },
  });
  return res.data;
};

export const unlockUser = async (token, userId) => {
  const res = await axios.patch(`${APP_BASE_URL}/api/v1/users/${userId}`, {
    headers: { Authorization: `${token}` },
  });
  return res.data;
};

export const updateUser = async (data, token) => {
  const res = await axios.patch(
    `${APP_BASE_URL}/api/v1/users/update-me`,
    data,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
