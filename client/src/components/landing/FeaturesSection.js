/**
 * Features Section Component
 * Displays key features of ATSPro with icons and descriptions
 */
import React from 'react';
import {
  HiDocumentText,
  HiChartBar,
  HiCog,
  HiLightningBolt,
  HiShieldCheck,
  HiDownload,
} from 'react-icons/hi';

const features = [
  {
    icon: HiDocumentText,
    title: 'Smart Resume Builder',
    description: 'Create professional resumes with our intuitive builder. Multiple templates designed to pass ATS systems.',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: HiChartBar,
    title: 'ATS Score Checker',
    description: 'Get instant feedback on how your resume performs against ATS filters with detailed scoring.',
    color: 'bg-accent-100 text-accent-600',
  },
  {
    icon: HiCog,
    title: 'AI Resume Suggestions',
    description: 'Powered by Gemini AI, get personalized suggestions to optimize your resume content and keywords.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: HiLightningBolt,
    title: 'Job Description Matching',
    description: 'Compare your resume against job descriptions to see match percentage and missing skills.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: HiShieldCheck,
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. We never share your resume information with third parties.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: HiDownload,
    title: 'PDF Export',
    description: 'Download your ATS-optimized resume as a professionally formatted PDF ready for submission.',
    color: 'bg-blue-100 text-blue-600',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides all the tools you need to create,
            optimize, and track your resume performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
