// src/services/feedback.service.js
import api from './api';

class FeedbackService {
  /**
   * Submit feedback (works for both authenticated and non-authenticated users)
   * @param {Object} feedbackData - Feedback data object
   * @returns {Promise<Object>} Response from server
   */
  async submitFeedback(feedbackData) {
    try {
      const response = await api.post('/api/feedback', feedbackData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response?.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error(error.message || 'Failed to submit feedback');
      }
    }
  }
}

export default new FeedbackService();
