/**
 * Resume Builder Demo Section
 * Visual showcase of the resume builder interface
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiTemplate } from 'react-icons/hi';

const templates = [
  {
    name: 'Modern',
    color: 'from-blue-500 to-cyan-400',
    description: 'Clean and contemporary design',
  },
  {
    name: 'Professional',
    color: 'from-gray-700 to-gray-900',
    description: 'Traditional and formal layout',
  },
  {
    name: 'Creative',
    color: 'from-purple-500 to-pink-500',
    description: 'Unique and eye-catching style',
  },
  {
    name: 'Minimal',
    color: 'from-emerald-500 to-teal-400',
    description: 'Simple and elegant design',
  },
];

const ResumeBuilderDemo = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of ATS-friendly templates designed to
            impress both automated systems and human recruiters.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {templates.map((template, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${template.color} rounded-2xl p-6 h-64 flex flex-col justify-end transform group-hover:scale-105 transition-all duration-300 shadow-lg`}>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/30 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <div className="h-2 bg-white/40 rounded w-3/4" />
                      <div className="h-2 bg-white/30 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="h-1.5 bg-white/20 rounded w-full" />
                    <div className="h-1.5 bg-white/20 rounded w-4/5" />
                    <div className="h-1.5 bg-white/20 rounded w-3/4" />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
          >
            <HiTemplate className="w-5 h-5 mr-2" />
            Start Building Your Resume
            <HiArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResumeBuilderDemo;
