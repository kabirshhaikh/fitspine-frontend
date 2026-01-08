import api from './api';

class FitbitService {
  /**
   * Get Fitbit authorization URL for OAuth connection
   * @returns {Promise<string>} Authorization URL to redirect user to
   */
  async getAuthUrl() {
    try {
      const { data } = await api.get('/api/wearable/fitbit/auth-url');
      return data; // This should be the full URL string
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get Fitbit auth URL');
    }
  }

  /**
   * Connect to Fitbit by redirecting to OAuth flow
   */
  async connect() {
    try {
      const authUrl = await this.getAuthUrl();
      // Redirect user to Fitbit OAuth
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to get auth URL:', error);
      throw new Error('Failed to initiate Fitbit connection');
    }
  }

  /**
   * Check if user has connected Fitbit (based on user context)
   * @param {Object} user - User object from auth context
   * @returns {boolean}
   */
  isConnected(user) {
    return user?.isWearableConnected === true && user?.wearableType === 'FITBIT';
  }

  /**
   * Get Fitbit activity data for today
   */
  async getTodayActivity() {
    try {
      const { data } = await api.get('/api/wearable/fitbit/activity');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch Fitbit activity');
    }
  }

  /**
   * Get Fitbit sleep data for today
   */
  async getTodaySleep() {
    try {
      const { data } = await api.get('/api/wearable/fitbit/sleep');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch Fitbit sleep data');
    }
  }

  /**
   * Get Fitbit heart rate data for today
   */
  async getTodayHeartRate() {
    try {
      const { data } = await api.get('/api/wearable/fitbit/heart-rate');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch Fitbit heart rate');
    }
  }

  /**
   * Revoke Fitbit connection
   */
  async revoke() {
    try {
      await api.get('/oauth/fitbit/revoke');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to revoke Fitbit connection');
    }
  }
}

export default new FitbitService();
