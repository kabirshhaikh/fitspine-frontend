// src/services/insights.service.js
import api from './api';

class InsightsService {
  /**
   * Generate daily AI insights for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise<Object>} AI insights response
   */
  async generateDailyInsight(date) {
    try {
      const { data } = await api.get(`/api/insights/generate/${date}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate daily insights');
    }
  }

  /**
   * Get today's insights
   * @returns {Promise<Object>} Today's AI insights
   */
  async getTodaysInsights() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`; // YYYY-MM-DD format in local timezone
    return this.generateDailyInsight(todayString);
  }
}

export default new InsightsService();
