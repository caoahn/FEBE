import axios from "axios";
import { ROOT_DOMAIN } from "../utils/constant";

export const instanceApi = axios.create({
    baseURL: ROOT_DOMAIN,
});

instanceApi.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { accessToken } = JSON.parse(userInfo);
    if(accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  config.headers.set('Content-Type', 'application/json');

  return config;
});

instanceApi.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  }
  return Promise.reject(error);
});