// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 60000, // Increased to 60 seconds for AI insights
});

const AUTH_WHITELIST = ['/api/user/login', '/api/user/register'];

api.interceptors.request.use((config) => {
  // Don't add Authorization on auth endpoints
  const isAuthEndpoint = AUTH_WHITELIST.some(path => (config.url || '').startsWith(path));
  if (!isAuthEndpoint) {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect to login for feedback endpoint or login endpoint (allows non-authenticated access or shows error on login page)
      const isFeedbackEndpoint = (error.config?.url || '').startsWith('/api/feedback');
      const isLoginEndpoint = (error.config?.url || '').startsWith('/api/user/login');
      if (!isFeedbackEndpoint && !isLoginEndpoint) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
