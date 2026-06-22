/**
 * ATS Service
 * API calls for ATS score checking
 */
import api from './api';

const atsService = {
  // Check ATS score
  checkScore: async (resumeId, jobDescription, jobTitle = '', company = '') => {
    const { data } = await api.post('/ats/check', {
      resumeId,
      jobDescription,
      jobTitle,
      company,
    });
    return data;
  },

  // Get ATS reports
  getReports: async (page = 1, limit = 10) => {
    const { data } = await api.get(`/ats/reports?page=${page}&limit=${limit}`);
    return data;
  },

  // Get single report
  getReport: async (id) => {
    const { data } = await api.get(`/ats/reports/${id}`);
    return data;
  },
};

export default atsService;
