/**
 * Dashboard Page
 * Main user dashboard with stats, recent resumes, and quick actions
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dashboardService from '../services/dashboardService';
import {
  HiDocumentText,
  HiChartBar,
  HiBriefcase,
  HiLightningBolt,
  HiPlus,
  HiArrowRight,
} from 'react-icons/hi';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await dashboardService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
      </div>
    );
  }

  const overview = stats?.overview || {};
  const recentResumes = stats?.recentResumes || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your resume overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Resumes', value: overview.totalResumes || 0, icon: HiDocumentText, color: 'bg-primary-500' },
            { label: 'ATS Checks', value: overview.totalATSReports || 0, icon: HiChartBar, color: 'bg-accent-500' },
            { label: 'Job Matches', value: overview.totalJobMatches || 0, icon: HiBriefcase, color: 'bg-purple-500' },
            { label: 'Avg ATS Score', value: `${overview.averageATSScore || 0}%`, icon: HiLightningBolt, color: 'bg-yellow-500' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/resume/new"
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <HiPlus className="w-6 h-6 text-primary-600" />
              </div>
              <HiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 mt-4">Create New Resume</h3>
            <p className="text-sm text-gray-500 mt-1">Build a new ATS-optimized resume</p>
          </Link>

          <Link
            to="/ats-checker"
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                <HiChartBar className="w-6 h-6 text-accent-600" />
              </div>
              <HiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 mt-4">Check ATS Score</h3>
            <p className="text-sm text-gray-500 mt-1">Analyze your resume against job descriptions</p>
          </Link>

          <Link
            to="/job-match"
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <HiBriefcase className="w-6 h-6 text-purple-600" />
              </div>
              <HiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 mt-4">Match with Job</h3>
            <p className="text-sm text-gray-500 mt-1">Compare resume against job postings</p>
          </Link>
        </div>

        {/* Recent Resumes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Resumes</h2>
              <Link to="/resume/new" className="text-primary-600 text-sm font-medium hover:text-primary-700">
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentResumes.length > 0 ? (
              <div className="space-y-4">
                {recentResumes.map((resume) => (
                  <div key={resume._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <HiDocumentText className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{resume.title}</h3>
                        <p className="text-sm text-gray-500">
                          {resume.template} • {new Date(resume.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {resume.atsScore?.score > 0 && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          resume.atsScore.score >= 80 ? 'bg-accent-100 text-accent-700' :
                          resume.atsScore.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {resume.atsScore.score}%
                        </span>
                      )}
                      <Link
                        to={`/resume/${resume._id}`}
                        className="px-4 py-2 text-primary-600 font-medium text-sm hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HiDocumentText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No resumes yet. Create your first one!</p>
                <Link
                  to="/resume/new"
                  className="inline-flex items-center mt-4 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                >
                  <HiPlus className="w-5 h-5 mr-2" />
                  Create Resume
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
