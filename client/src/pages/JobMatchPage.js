/**
 * Job Match Page
 * Analyze resume compatibility with job descriptions
 */
import React, { useState, useEffect } from 'react';
import jobMatchService from '../services/jobMatchService';
import resumeService from '../services/resumeService';
import toast from 'react-hot-toast';
import {
  HiBriefcase,
  HiSearch,
  HiCheckCircle,
  HiXCircle,
  HiTrash,
} from 'react-icons/hi';

const JobMatchPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [match, setMatch] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchResumes();
    fetchHistory();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await resumeService.getResumes(1, 50);
      setResumes(data.data);
    } catch (error) {
      console.error('Failed to load resumes');
    }
  };

  const fetchHistory = async () => {
    try {
      const { data } = await jobMatchService.getHistory(1, 10);
      setHistory(data.data);
    } catch (error) {
      console.error('Failed to load history');
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!selectedResume || !jobDescription || !jobTitle) {
      toast.error('Please fill in all required fields');
      return;
    }

    setAnalyzing(true);
    try {
      const { data } = await jobMatchService.analyze(selectedResume, jobTitle, company, jobDescription);
      setMatch(data.data);
      toast.success('Job match analysis completed!');
      fetchHistory();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await jobMatchService.deleteMatch(id);
      setHistory(history.filter(h => h._id !== id));
      toast.success('Match deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Match Analyzer</h1>
          <p className="text-gray-600 mt-1">See how well your resume matches specific job postings.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Analyze Job Match</h2>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Software Engineer"
                    required
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
                  placeholder="Paste the job description here..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <HiSearch className="w-5 h-5 mr-2" />
                {analyzing ? 'Analyzing...' : 'Analyze Match'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {match ? (
              <>
                {/* Match Score */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="text-center mb-6">
                    <div className={`text-6xl font-bold ${getScoreColor(match.matchScore)} mb-2`}>
                      {match.matchScore}%
                    </div>
                    <p className="text-gray-500">Overall Match Score</p>
                  </div>

                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        match.matchScore >= 80 ? 'bg-accent-500' :
                        match.matchScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${match.matchScore}%` }}
                    />
                  </div>
                </div>

                {/* Skill Match */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Skill Analysis</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-4 bg-accent-50 rounded-xl">
                      <div className="text-2xl font-bold text-accent-600">
                        {match.skillMatch?.matched?.length || 0}
                      </div>
                      <p className="text-sm text-gray-600">Matched Skills</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-xl">
                      <div className="text-2xl font-bold text-red-600">
                        {match.skillMatch?.missing?.length || 0}
                      </div>
                      <p className="text-sm text-gray-600">Missing Skills</p>
                    </div>
                  </div>

                  {match.skillMatch?.matched?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-accent-700 mb-2 flex items-center">
                        <HiCheckCircle className="w-4 h-4 mr-1" />
                        Matched Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {match.skillMatch.matched.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {match.skillMatch?.missing?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                        <HiXCircle className="w-4 h-4 mr-1" />
                        Missing Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {match.skillMatch.missing.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Match Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Match Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">Experience</span>
                      <span className={`text-sm font-medium ${match.experienceMatch?.isMatch ? 'text-accent-600' : 'text-red-600'}`}>
                        {match.experienceMatch?.candidate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">Education</span>
                      <span className={`text-sm font-medium ${match.educationMatch?.isMatch ? 'text-accent-600' : 'text-red-600'}`}>
                        {match.educationMatch?.candidate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {match.recommendations?.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recommendations</h3>
                    <div className="space-y-3">
                      {match.recommendations.map((rec, i) => (
                        <div key={i} className="p-3 bg-primary-50 rounded-xl">
                          <p className="text-sm text-primary-800">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <HiBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
                <p className="text-gray-500">Select a resume and enter job details to analyze the match.</p>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Match History</h2>
            <div className="space-y-3">
              {history.map((h) => (
                <div key={h._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <HiBriefcase className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{h.jobTitle}</h3>
                      <p className="text-sm text-gray-500">{h.company || 'N/A'} • {new Date(h.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-xl font-bold ${getScoreColor(h.matchScore)}`}>
                      {h.matchScore}%
                    </span>
                    <button
                      onClick={() => handleDelete(h._id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatchPage;
