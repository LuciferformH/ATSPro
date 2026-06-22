/**
 * Hero Section Component
 * Landing page hero with animated elements and CTA
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiSparkles, HiShieldCheck, HiDocumentText } from 'react-icons/hi';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6 animate-fade-in">
              <HiSparkles className="w-4 h-4 mr-2" />
              AI-Powered Resume Optimization
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 animate-slide-up">
              Build Resumes That{' '}
              <span className="text-gradient">Pass ATS</span>{' '}
              & Land Interviews
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up">
              Create ATS-optimized resumes with AI-powered suggestions, score analysis,
              and job matching. Stand out from the crowd and get noticed by recruiters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300"
              >
                Start Building Free
                <HiArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all"
              >
                See How It Works
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-gray-500">
              <div className="flex items-center">
                <HiShieldCheck className="w-5 h-5 text-accent-500 mr-1" />
                Free to Start
              </div>
              <div className="flex items-center">
                <HiDocumentText className="w-5 h-5 text-accent-500 mr-1" />
                No Credit Card Required
              </div>
            </div>
          </div>

          {/* Right content - Demo card */}
          <div className="relative animate-slide-up hidden lg:block">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">ATS Score Analysis</h3>
                <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                  92/100
                </span>
              </div>

              {/* Score bars */}
              <div className="space-y-4">
                {[
                  { label: 'Keywords', score: 95, color: 'bg-accent-500' },
                  { label: 'Formatting', score: 88, color: 'bg-primary-500' },
                  { label: 'Experience', score: 90, color: 'bg-blue-500' },
                  { label: 'Skills Match', score: 85, color: 'bg-purple-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.score}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-accent-50 rounded-xl">
                <p className="text-sm text-accent-800 font-medium">
                  AI Suggestion: Add "React" and "Node.js" to improve keyword match by 15%
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-primary-600 text-white px-4 py-2 rounded-xl shadow-lg animate-pulse-slow">
              <span className="text-sm font-medium">AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
