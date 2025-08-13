import api from './api';
import axios from 'axios'; // Added missing import for axios

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(userData) {
    try {
      // Check if userData is FormData (has file upload) or regular object
      const isFormData = userData instanceof FormData;
      
      // Create a new axios instance for this request to override default headers
      const registerApi = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
        timeout: 10000,
        headers: isFormData 
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' }
      });

      const response = await registerApi.post('/api/user/register', userData);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  // Refresh token (for future implementation)
  async refreshToken() {
    try {
      const response = await api.post('/api/auth/refresh');
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      return token;
    } catch (error) {
      this.logout();
      throw error;
    }
  }
}

export default new AuthService();
