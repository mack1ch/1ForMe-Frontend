import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://1forme.postideas.store/api";

export const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
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
