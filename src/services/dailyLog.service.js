import api from './api';

class DailyLogService {
  // Create a new daily log
  async createDailyLog(logData) {
    try {
      const response = await api.post('/api/manual-daily-log', logData);
      return response.data;
    } catch (error) {
      console.error('Error creating daily log:', error);
      throw new Error('Failed to create daily log');
    }
  }

  // Get log for a specific date
  async getLogForDate(date) {
    try {
      const response = await api.get(`/api/manual-daily-log/date`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching daily log:', error);
      // Preserve the original error so we can check status code (404 for not found)
      throw error;
    }
  }
}

export default new DailyLogService();
