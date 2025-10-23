// src/services/graph.service.js
import api from './api';

class GraphService {
  /**
   * Get weekly graph data for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise<Object>} Weekly graph data
   */
  async getWeeklyGraph(date) {
    try {
      const { data } = await api.get(`/api/insights/weekly-graph/${date}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weekly graph data');
    }
  }

  /**
   * Get today's weekly graph
   * @returns {Promise<Object>} Weekly graph data
   */
  async getTodaysWeeklyGraph() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    return this.getWeeklyGraph(todayString);
  }
}

export default new GraphService();
