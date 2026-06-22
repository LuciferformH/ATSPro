/**
 * ATS Checker Page
 * Analyze resume against job descriptions for ATS compatibility
 */
import React, { useState, useEffect } from 'react';
import atsService from '../services/atsService';
import resumeService from '../services/resumeService';
import toast from 'react-hot-toast';
import {
  HiChartBar,
  HiSearch,
  HiCheckCircle,
  HiExclamationCircle,
  HiDocumentText,
} from 'react-icons/hi';

const ATSCheckerPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchResumes();
    fetchReports();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await resumeService.getResumes(1, 50);
      setResumes(data.data);
    } catch (error) {
      console.error('Failed to load resumes');
    }
  };

  const fetchReports = async () => {
    try {
      const { data } = await atsService.getReports(1, 10);
      setReports(data.data);
    } catch (error) {
      console.error('Failed to load reports');
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!selectedResume || !jobDescription) {
      toast.error('Please select a resume and enter job description');
      return;
    }

    setAnalyzing(true);
    try {
      const { data } = await atsService.checkScore(selectedResume, jobDescription, jobTitle, company);
      setReport(data.data);
      toast.success('ATS analysis completed!');
      fetchReports();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-accent-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ATS Score Checker</h1>
          <p className="text-gray-600 mt-1">Analyze your resume against job descriptions to optimize for ATS systems.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Analyze Resume</h2>
            <form onSubmit={handleAnalyze} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Resume *</label>
                <select
                  value={selectedResume}
                  onChange={(e) => setSelectedResume(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  required
                >
                  <option value="">Choose a resume...</option>
                  {resumes.map((r) => (
                    <option key={r._id} value={r._id}>{r.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Google"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                  placeholder="Paste the full job description here. Include requirements, skills, and responsibilities for the most accurate analysis..."
                  required
                  minLength={50}
                />
                <p className="text-xs text-gray-400 mt-1">Minimum 50 characters recommended for accurate analysis</p>
              </div>

              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <HiSearch className="w-5 h-5 mr-2" />
                {analyzing ? 'Analyzing...' : 'Analyze ATS Score'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {report ? (
              <>
                {/* Score Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">ATS Score</h2>
                    <span className={`text-4xl font-bold ${getScoreColor(report.overallScore)}`}>
                      {report.overallScore}%
                    </span>
                  </div>

                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-6">
                    <div
                      className={`h-full ${getScoreBg(report.overallScore)} rounded-full transition-all duration-1000`}
                      style={{ width: `${report.overallScore}%` }}
                    />
                  </div>

                  {/* Category Scores */}
                  <div className="space-y-3">
                    {Object.entries(report.categoryScores || {}).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 capitalize">{key}</span>
                          <span className="font-medium text-gray-900">{value}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getScoreBg(value)} rounded-full`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Keyword Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-accent-700 mb-2 flex items-center">
                        <HiCheckCircle className="w-4 h-4 mr-1" />
                        Matched Keywords ({report.matchedKeywords?.length || 0})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(report.matchedKeywords || []).slice(0, 15).map((kw, i) => (
                          <span key={i} className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                        <HiExclamationCircle className="w-4 h-4 mr-1" />
                        Missing Keywords ({report.missingKeywords?.length || 0})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(report.missingKeywords || []).slice(0, 15).map((kw, i) => (
                          <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                {report.aiAnalysis && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">AI Analysis</h3>
                    <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">
                      {report.aiAnalysis}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {report.suggestions?.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Suggestions</h3>
                    <div className="space-y-3">
                      {report.suggestions.map((s, i) => (
                        <div key={i} className={`p-3 rounded-xl ${
                          s.priority === 'high' ? 'bg-red-50 border border-red-200' :
                          s.priority === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                          'bg-blue-50 border border-blue-200'
                        }`}>
                          <p className={`text-sm font-medium ${
                            s.priority === 'high' ? 'text-red-800' :
                            s.priority === 'medium' ? 'text-yellow-800' :
                            'text-blue-800'
                          }`}>
                            [{s.priority?.toUpperCase()}] {s.category}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{s.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <HiChartBar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
                <p className="text-gray-500">Select a resume and paste a job description to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        {reports.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Analyses</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Job Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Company</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{new Date(r.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{r.jobTitle || 'N/A'}</td>
                      <td className="py-3 px-4">{r.company || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${getScoreColor(r.overallScore)}`}>
                          {r.overallScore}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSCheckerPage;
