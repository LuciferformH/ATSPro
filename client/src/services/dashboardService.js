/**
 * Dashboard Service
 * API calls for dashboard statistics
 */
import api from './api';

const dashboardService = {
  getStats: async () => {
    const { data } = await api.get('/dashboard/stats');
    return data;
  },
};

export default dashboardService;
