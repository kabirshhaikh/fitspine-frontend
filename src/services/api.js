// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 60000, // Increased to 60 seconds for AI insights
});

const AUTH_WHITELIST = ['/api/user/login', '/api/user/register'];

api.interceptors.request.use((config) => {
  console.log('API Request:', {
    method: config.method,
    url: config.url,
    baseURL: config.baseURL,
    fullURL: `${config.baseURL}${config.url}`,
  });
  
  // Don't add Authorization on auth endpoints
  const isAuthEndpoint = AUTH_WHITELIST.some(path => (config.url || '').startsWith(path));
  if (!isAuthEndpoint) {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header added');
    } else {
      console.warn('No auth token found');
    }
  } else {
    delete config.headers.Authorization;
  }

  // Let the browser set the boundary for FormData
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    // default JSON for non-multipart requests
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (res) => {
    console.log('API Response:', {
      status: res.status,
      url: res.config.url,
      data: res.data,
    });
    return res;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      stack: error.stack,
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
