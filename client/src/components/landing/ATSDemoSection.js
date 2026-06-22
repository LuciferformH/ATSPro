/**
 * ATS Analysis Demo Section
 * Interactive demo showing ATS scoring capabilities
 */
import React, { useState } from 'react';
import { HiSearch, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

const ATSDemoSection = () => {
  const [activeTab, setActiveTab] = useState('resume');

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See How ATS Analysis Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our intelligent system analyzes your resume against job descriptions
            and provides actionable insights to improve your chances.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            {/* Tabs */}
            <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab('resume')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'resume'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Resume Content
              </button>
              <button
                onClick={() => setActiveTab('job')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'job'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Job Description
              </button>
            </div>

            {activeTab === 'resume' ? (
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="font-semibold mb-2">John Doe - Software Engineer</h4>
                  <p className="text-sm text-gray-300">
                    5+ years of experience in full-stack development. Proficient in
                    React, Node.js, Python, and cloud technologies...
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="font-semibold mb-2">Senior React Developer</h4>
                  <p className="text-sm text-gray-300">
                    Looking for a senior React developer with 5+ years experience.
                    Must have TypeScript, GraphQL, and CI/CD knowledge...
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'GraphQL', 'CI/CD', 'Git'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Score Results */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Match Analysis</h3>
                <span className="text-3xl font-bold text-accent-600">87%</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                  <span className="text-sm">Strong keyword match (5/6 required)</span>
                </div>
                <div className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                  <span className="text-sm">Experience level matches requirements</span>
                </div>
                <div className="flex items-center">
                  <HiExclamationCircle className="w-5 h-5 text-yellow-500 mr-3" />
                  <span className="text-sm">Missing "GraphQL" keyword</span>
                </div>
                <div className="flex items-center">
                  <HiExclamationCircle className="w-5 h-5 text-yellow-500 mr-3" />
                  <span className="text-sm">Consider adding CI/CD experience</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                <p className="text-sm text-primary-800 font-medium">
                  AI Recommendation: Add a project that demonstrates GraphQL experience to boost your score to 95%+
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ATSDemoSection;
