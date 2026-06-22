/**
 * Resume Builder Page
 * Full-featured resume editor with sections and AI suggestions
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import resumeService from '../services/resumeService';
import aiService from '../services/aiService';
import toast from 'react-hot-toast';
import {
  HiSave,
  HiDownload,
  HiPlus,
  HiTrash,
  HiSparkles,
  HiCog,
} from 'react-icons/hi';

const defaultResume = {
  title: 'My Resume',
  template: 'modern',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    github: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
};

const ResumeBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(defaultResume);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadResume();
    }
  }, [id]);

  const loadResume = async () => {
    try {
      const { data } = await resumeService.getResume(id);
      setResume(data.data);
    } catch (error) {
      toast.error('Failed to load resume');
      navigate('/dashboard');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await resumeService.updateResume(id, resume);
        toast.success('Resume saved successfully');
      } else {
        const { data } = await resumeService.createResume(resume);
        toast.success('Resume created successfully');
        navigate(`/resume/${data.data._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleAISuggestion = async (section) => {
    if (!id) {
      toast.error('Save the resume first');
      return;
    }
    setAiLoading(true);
    try {
      const { data } = await aiService.getSuggestions(id, section);
      toast.success('AI suggestions generated! Check the suggestions panel.');
    } catch (error) {
      toast.error('Failed to get AI suggestions');
    } finally {
      setAiLoading(false);
    }
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [...resume.experience, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        achievements: [''],
      }],
    });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [...resume.education, {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: '',
      }],
    });
  };

  const addSkillCategory = () => {
    setResume({
      ...resume,
      skills: [...resume.skills, { category: '', items: [''] }],
    });
  };

  const updateField = (section, index, field, value) => {
    const updated = { ...resume };
    if (index !== null) {
      updated[section][index][field] = value;
    } else {
      updated[section] = value;
    }
    setResume(updated);
  };

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={resume.title}
              onChange={(e) => setResume({ ...resume, title: e.target.value })}
              className="text-xl font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0"
              placeholder="Resume Title"
            />
            <select
              value={resume.template}
              onChange={(e) => setResume({ ...resume, template: e.target.value })}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
            >
              <option value="modern">Modern</option>
              <option value="professional">Professional</option>
              <option value="minimal">Minimal</option>
              <option value="creative">Creative</option>
              <option value="executive">Executive</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleAISuggestion(activeSection)}
              disabled={aiLoading}
              className="flex items-center px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <HiSparkles className="w-5 h-5 mr-2" />
              {aiLoading ? 'Thinking...' : 'AI Suggest'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <HiSave className="w-5 h-5 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Sections</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Personal Info Section */}
              {activeSection === 'personal' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={resume.personalInfo.fullName}
                        onChange={(e) => updateField('personalInfo', null, 'fullName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={(e) => updateField('personalInfo', null, 'email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={resume.personalInfo.phone}
                        onChange={(e) => updateField('personalInfo', null, 'phone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={resume.personalInfo.location}
                        onChange={(e) => updateField('personalInfo', null, 'location', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <input
                        type="url"
                        value={resume.personalInfo.linkedin}
                        onChange={(e) => updateField('personalInfo', null, 'linkedin', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                      <input
                        type="url"
                        value={resume.personalInfo.github}
                        onChange={(e) => updateField('personalInfo', null, 'github', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="https://github.com/johndoe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                    <textarea
                      value={resume.personalInfo.summary}
                      onChange={(e) => updateField('personalInfo', null, 'summary', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                      placeholder="Brief professional summary highlighting your key achievements and goals..."
                    />
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                    <button
                      onClick={addExperience}
                      className="flex items-center px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-sm"
                    >
                      <HiPlus className="w-4 h-4 mr-1" />
                      Add Experience
                    </button>
                  </div>

                  {resume.experience.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <p className="text-gray-500">No experience added yet</p>
                      <button
                        onClick={addExperience}
                        className="mt-2 text-primary-600 font-medium hover:text-primary-700"
                      >
                        Add your first position
                      </button>
                    </div>
                  ) : (
                    resume.experience.map((exp, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">Position {index + 1}</h3>
                          <button
                            onClick={() => {
                              const updated = resume.experience.filter((_, i) => i !== index);
                              setResume({ ...resume, experience: updated });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateField('experience', index, 'company', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Company Name"
                          />
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => updateField('experience', index, 'position', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Job Title"
                          />
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateField('experience', index, 'startDate', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Start Date"
                          />
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => updateField('experience', index, 'endDate', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="End Date"
                          />
                        </div>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateField('experience', index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                          placeholder="Job description and key responsibilities..."
                        />
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Education Section */}
              {activeSection === 'education' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                    <button
                      onClick={addEducation}
                      className="flex items-center px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-sm"
                    >
                      <HiPlus className="w-4 h-4 mr-1" />
                      Add Education
                    </button>
                  </div>

                  {resume.education.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <p className="text-gray-500">No education added yet</p>
                    </div>
                  ) : (
                    resume.education.map((edu, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">Education {index + 1}</h3>
                          <button
                            onClick={() => {
                              const updated = resume.education.filter((_, i) => i !== index);
                              setResume({ ...resume, education: updated });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateField('education', index, 'institution', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="University Name"
                          />
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateField('education', index, 'degree', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Degree"
                          />
                          <input
                            type="text"
                            value={edu.fieldOfStudy}
                            onChange={(e) => updateField('education', index, 'fieldOfStudy', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Field of Study"
                          />
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateField('education', index, 'gpa', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="GPA (optional)"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                    <button
                      onClick={addSkillCategory}
                      className="flex items-center px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-sm"
                    >
                      <HiPlus className="w-4 h-4 mr-1" />
                      Add Category
                    </button>
                  </div>

                  {resume.skills.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <p className="text-gray-500">No skills added yet</p>
                    </div>
                  ) : (
                    resume.skills.map((skillGroup, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={skillGroup.category}
                            onChange={(e) => updateField('skills', index, 'category', e.target.value)}
                            className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0"
                            placeholder="Category (e.g., Frontend, Backend)"
                          />
                          <button
                            onClick={() => {
                              const updated = resume.skills.filter((_, i) => i !== index);
                              setResume({ ...resume, skills: updated });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={(skillGroup.items || []).join(', ')}
                          onChange={(e) => updateField('skills', index, 'items', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                          placeholder="React, JavaScript, TypeScript, HTML, CSS..."
                        />
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Projects Section */}
              {activeSection === 'projects' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">Project section coming soon</p>
                    <p className="text-sm text-gray-400 mt-1">This feature is under development</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
