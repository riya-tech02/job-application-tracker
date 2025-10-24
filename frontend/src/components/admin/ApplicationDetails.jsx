import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Download, FileText } from 'lucide-react';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await api.get(`/applications/${id}`);
      setApplication(response.data);
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = () => {
    window.open(`http://localhost:5000${application.resumeUrl}`, '_blank');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Under Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Interview': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Accepted': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Application not found</h2>
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-700">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {application.fullName}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">{application.desiredRole}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
              {application.status}
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white">{application.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-gray-900 dark:text-white">{application.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-gray-900 dark:text-white">{application.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Applied On</p>
                <p className="text-gray-900 dark:text-white">{formatDate(application.submittedAt)}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          {(application.linkedIn || application.github || application.portfolio) && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Links</p>
              <div className="flex flex-wrap gap-3">
                {application.linkedIn && (
                  <a href={application.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm">
                    LinkedIn
                  </a>
                )}
                {application.github && (
                  <a href={application.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm">
                    GitHub
                  </a>
                )}
                {application.portfolio && (
                  <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm">
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Education */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Highest Qualification</p>
              <p className="text-gray-900 dark:text-white font-medium">{application.highestQualification}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">University/College</p>
              <p className="text-gray-900 dark:text-white font-medium">{application.universityName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Graduation Year</p>
              <p className="text-gray-900 dark:text-white font-medium">{application.graduationYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">GPA/Percentage</p>
              <p className="text-gray-900 dark:text-white font-medium">{application.gpa}</p>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Work Experience</h2>
          </div>
          <div className="space-y-4">
            {application.workExperience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                <p className="text-gray-600 dark:text-gray-400">{exp.companyName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.responsibilities}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Certifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills & Certifications</h2>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {application.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {application.certifications.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {application.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Job Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Job Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expected Salary</p>
              <p className="text-gray-900 dark:text-white font-medium">{application.expectedSalary}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Location Preferences</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {application.locationPreferences.map((loc, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-sm">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cover Letter */}
        {application.coverLetter && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cover Letter</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{application.coverLetter}</p>
          </div>
        )}

        {/* Admin Notes */}
        {application.adminNotes && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-300 mb-4">Admin Notes</h2>
            <p className="text-yellow-800 dark:text-yellow-400">{application.adminNotes}</p>
          </div>
        )}

        {/* Resume Download */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <button
            onClick={downloadResume}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full justify-center"
          >
            <Download className="h-5 w-5" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;