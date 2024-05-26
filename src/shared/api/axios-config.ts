import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://37.27.44.250:3000";

export const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

export const wazzupInstance: AxiosInstance = axios.create({
  baseURL: "https://api.wazzup24.com",
  timeout: 5000,
  headers: {
    Authorization: `Bearer 00edd1ec41ba48448dc690015759f598`,
  },
});

export const instanceLogged = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

instanceLogged.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem(
    "accessToken"
  )}`;
  return config;
});
