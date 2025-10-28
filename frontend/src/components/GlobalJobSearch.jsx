import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://job-application-tracker-u21m.onrender.com';

const GlobalJobSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/global-jobs/search`, { 
        params: { query: searchQuery } 
      });
      if (response.data.success) setJobs(response.data.data);
    } catch (err) {
      alert('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">🌍 Global Job Search</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      {loading && <div className="text-center py-12">Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.externalId} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
            <p className="mt-2">📍 {job.location}</p>
            <p>💰 {job.salary}</p>
            {job.applyLink && (
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded">
                Apply
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalJobSearch;
