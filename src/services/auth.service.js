import api from './api';

class AuthService {
  async login(email, password) {
    try {
      const { data } = await api.post('/api/user/login', { email, password });
      // data = { token, email, fullName, profilePicture, id, isWearableConnected, wearableType, hasOnBoardingCompleted }
      const {
        token,
        email: em,
        fullName,
        profilePicture,
        id,
        isWearableConnected,
        wearableType,
        hasOnBoardingCompleted,
      } = data;

      // Build a user object for the app
      const user = {
        email: em,
        fullName,
        profilePicture,
        id,
        isWearableConnected,
        wearableType,
        hasOnBoardingCompleted: hasOnBoardingCompleted ?? false,
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

      // Register endpoint returns user data but no token (UserResponseDto includes hasOnBoardingCompleted: false)
      const {
        id,
        email: em,
        fullName,
        profilePicture,
        isWearableConnected,
        wearableType,
        hasOnBoardingCompleted,
      } = data;

      const user = {
        id,
        email: em,
        fullName,
        profilePicture,
        isWearableConnected,
        wearableType,
        hasOnBoardingCompleted: hasOnBoardingCompleted ?? false,
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

  async completeOnboarding() {
    await api.patch('/api/user/onboarding-complete');
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

  /**
   * Register or sign in with Google. Sends the Google ID token to
   * POST /api/user/auth/google/register. Backend returns LoginResponseDto and should
   * set needsProfileCompletion: true when the user was just created (new Google user).
   */
  async registerWithGoogle(idToken) {
    try {
      const { data } = await api.post('/api/user/auth/google/register', { idToken });
      if (!data.token) {
        throw new Error('Google sign-in is not fully configured yet. Please use email and password.');
      }
      const needsProfileCompletion = !!data.needsProfileCompletion;
      const user = data.user || {
        id: data.id,
        email: data.email,
        fullName: data.fullName || data.name,
        profilePicture: data.profilePicture || data.picture,
        isWearableConnected: data.isWearableConnected ?? false,
        wearableType: data.wearableType ?? null,
        hasOnBoardingCompleted: data.hasOnBoardingCompleted ?? false,
        needsProfileCompletion,
      };
      if (!data.user && needsProfileCompletion) {
        user.needsProfileCompletion = true;
      }
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token: data.token, user, needsProfileCompletion };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Google sign-up failed');
    }
  }

  /**
   * Complete profile for a new Google user. Sends FormData to
   * POST /api/user/auth/google/register-partial-user (Bearer token from Google register).
   * Backend returns LoginResponseDto; overwrite stored token and user with new one.
   */
  async completeGoogleProfile(formData) {
    try {
      const { data } = await api.post('/api/user/auth/google/register-partial-user', formData);
      if (!data.token) {
        throw new Error('Profile update failed. Please try again.');
      }
      const user = {
        id: data.id,
        email: data.email,
        fullName: data.fullName || data.name,
        profilePicture: data.profilePicture || data.picture,
        isWearableConnected: data.isWearableConnected ?? false,
        wearableType: data.wearableType ?? null,
        hasOnBoardingCompleted: data.hasOnBoardingCompleted ?? false,
      };
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token: data.token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Could not complete profile');
    }
  }
}

export default new AuthService();
