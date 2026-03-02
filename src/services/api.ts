import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  console.log("Axios request starting", { baseURL: config.baseURL, url: config.url });
  const token = Cookies.get('@blog:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error("Axios request error", error);
  return Promise.reject(error);
});

export default api;
