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
      console.log('Submitting feedback:', feedbackData);
      const response = await api.post('/api/feedback', feedbackData);
      console.log('Feedback submitted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      
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
