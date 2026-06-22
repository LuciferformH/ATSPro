/**
 * Resume Service
 * API calls for resume management
 */
import api from './api';

const resumeService = {
  // Get all resumes
  getResumes: async (page = 1, limit = 10) => {
    const { data } = await api.get(`/resumes?page=${page}&limit=${limit}`);
    return data;
  },

  // Get single resume
  getResume: async (id) => {
    const { data } = await api.get(`/resumes/${id}`);
    return data;
  },

  // Create resume
  createResume: async (resumeData) => {
    const { data } = await api.post('/resumes', resumeData);
    return data;
  },

  // Update resume
  updateResume: async (id, resumeData) => {
    const { data } = await api.put(`/resumes/${id}`, resumeData);
    return data;
  },

  // Delete resume
  deleteResume: async (id) => {
    const { data } = await api.delete(`/resumes/${id}`);
    return data;
  },

  // Duplicate resume
  duplicateResume: async (id) => {
    const { data } = await api.post(`/resumes/${id}/duplicate`);
    return data;
  },
};

export default resumeService;
