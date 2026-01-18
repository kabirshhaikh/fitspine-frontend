import api from './api';

class AuthService {
  async login(email, password) {
    try {
      const { data } = await api.post('/api/user/login', { email, password });
      // data = { token, email, fullName, profilePicture, id, isWearableConnected, wearableType }
      const { 
        token, 
        email: em, 
        fullName, 
        profilePicture, 
        id,
        isWearableConnected,
        wearableType
      } = data;

      // Build a user object for the app
      const user = { 
        email: em, 
        fullName, 
        profilePicture, 
        id,
        isWearableConnected,
        wearableType
      };

      if (token) localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(formData) {
    try {
      const { data } = await api.post('/api/user/register', formData);

      // Register endpoint returns user data but no token
      // We need to extract the wearable connection info
      const { 
        id, 
        email: em, 
        fullName, 
        profilePicture,
        isWearableConnected,
        wearableType
      } = data;
      
      // Build user object (without token since register doesn't return one)
      const user = { 
        id,
        email: em, 
        fullName, 
        profilePicture,
        isWearableConnected,
        wearableType
      };

      // Store user data (but no token since user needs to login)
      localStorage.setItem('user', JSON.stringify(user));

      return { user };

      // Note: User will need to login after registration to get token
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
    const raw = localStorage.getItem('user');
    if (!raw || raw === 'undefined' || raw === 'null') return null;
    try { return JSON.parse(raw); }
    catch { localStorage.removeItem('user'); return null; }
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  async refreshUserData() {
    try {
      // Get current user email from stored user data
      const currentUser = this.getCurrentUser();
      if (!currentUser?.email) {
        throw new Error('No user data found');
      }

      // For now, we'll need to call login again to get updated user data
      // In a real app, you'd have a separate /api/user/profile endpoint
      // But since we don't have that, we'll simulate a refresh
      // The user would need to login again to get updated data
      return currentUser;
    } catch (error) {
      return null;
    }
  }

  async forgotPassword(email) {
    try {
      const { data } = await api.post('/api/user/forgot-password', { email });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send password reset email';
      throw new Error(errorMessage);
    }
  }

  async verifyResetToken(email, securityToken, newPassword, confirmPassword) {
    try {
      const { data } = await api.post('/api/user/set-password', {
        email,
        securityToken,
        newPassword,
        confirmPassword
      });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to reset password';
      throw new Error(errorMessage);
    }
  }
}

export default new AuthService();
