/**
 * Job Match Service
 * API calls for job matching analysis
 */
import api from './api';

const jobMatchService = {
  // Analyze job match
  analyze: async (resumeId, jobTitle, company, jobDescription) => {
    const { data } = await api.post('/job-match/analyze', {
      resumeId,
      jobTitle,
      company,
      jobDescription,
    });
    return data;
  },

  // Get match history
  getHistory: async (page = 1, limit = 10) => {
    const { data } = await api.get(`/job-match/history?page=${page}&limit=${limit}`);
    return data;
  },

  // Get single match
  getMatch: async (id) => {
    const { data } = await api.get(`/job-match/${id}`);
    return data;
  },

  // Delete match
  deleteMatch: async (id) => {
    const { data } = await api.delete(`/job-match/${id}`);
    return data;
  },
};

export default jobMatchService;
