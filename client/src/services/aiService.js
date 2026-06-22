/**
 * AI Service
 * API calls for AI-powered features
 */
import api from './api';

const aiService = {
  // Get AI suggestions
  getSuggestions: async (resumeId, section = 'general') => {
    const { data } = await api.post('/ai/suggestions', { resumeId, section });
    return data;
  },

  // Generate resume summary
  generateSummary: async (resumeId) => {
    const { data } = await api.post('/ai/generate-summary', { resumeId });
    return data;
  },
};

export default aiService;
