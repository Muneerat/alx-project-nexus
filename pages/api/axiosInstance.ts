// src/api/axiosInstance.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the access token from local storage
    const accessToken = localStorage.getItem('access_token');
    
    // If a token exists, add it to the Authorization header
    if (accessToken) {
        
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;