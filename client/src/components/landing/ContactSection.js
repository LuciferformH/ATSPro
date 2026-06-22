/**
 * Contact Section Component
 * Footer-style contact and newsletter signup
 */
import React, { useState } from 'react';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';

const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-gray-900 text-white">
      {/* Newsletter */}
      <div className="py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with Career Tips
            </h2>
            <p className="text-gray-400 mb-8">
              Get weekly resume tips, ATS insights, and job search strategies
              delivered to your inbox.
            </p>

            {subscribed ? (
              <div className="bg-accent-500/20 text-accent-300 px-6 py-4 rounded-xl">
                Thanks for subscribing! Check your inbox for a confirmation email.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold">ATSPro</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                AI-powered resume builder and ATS checker helping job seekers
                create optimized resumes that land interviews.
              </p>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="flex items-center">
                  <HiMail className="w-4 h-4 mr-3" />
                  contact@atspro.dev
                </div>
                <div className="flex items-center">
                  <HiLocationMarker className="w-4 h-4 mr-3" />
                  San Francisco, CA
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#api" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} ATSPro. All rights reserved. Built with AI for your career success.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
