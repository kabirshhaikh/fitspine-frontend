import api from './api';

class AuthService {
  async login(email, password) {
    try {
      const { data } = await api.post('/api/user/login', { email, password });
      // data = { token, email, fullName, profilePicture }
      const { token, email: em, fullName, profilePicture } = data;

      // Build a minimal user object for the app
      const user = { email: em, fullName, profilePicture };

      if (token) localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(formData) {
    try {
      // Decide what your backend returns on register:
      // A) same as login (recommended), or
      // B) just created user (then you’d call login afterwards)
      const { data } = await api.post('/api/user/register', formData);

      // If your register endpoint returns the SAME shape as login:
      const { token, email: em, fullName, profilePicture } = data;
      const user = { email: em, fullName, profilePicture };

      if (token) localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };

      // If your register currently returns something else (e.g., no token),
      // do this instead:
      // await this.login(formData.get('email'), formData.get('password'));
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
}

export default new AuthService();
