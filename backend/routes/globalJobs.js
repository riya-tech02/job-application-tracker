const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /api/global-jobs/search
router.get('/search', async (req, res) => {
  try {
    const { query, location, remote, page = 1 } = req.query;

    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Query parameter is required' 
      });
    }

    // Build search query
    let searchQuery = query;
    if (location && location.toLowerCase() !== 'any') {
      searchQuery += ` in ${location}`;
    }
    if (remote === 'true') {
      searchQuery += ' remote';
    }

    // JSearch API configuration
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: searchQuery,
        page: page.toString(),
        num_pages: '1'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    const jobs = response.data.data.map(job => ({
      externalId: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city && job.job_country 
        ? `${job.job_city}, ${job.job_country}` 
        : job.job_country || 'Not specified',
      salary: job.job_min_salary && job.job_max_salary
        ? `${job.job_salary_currency || '$'}${job.job_min_salary.toLocaleString()} - ${job.job_max_salary.toLocaleString()}`
        : 'Not disclosed',
      applyLink: job.job_apply_link,
      description: job.job_description,
      employmentType: job.job_employment_type,
      isRemote: job.job_is_remote
    }));

    res.json({
      success: true,
      data: jobs,
      total: response.data.data.length
    });

  } catch (error) {
    console.error('Error fetching global jobs:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'API rate limit exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs. Please try again.'
    });
  }
});

// POST /api/global-jobs/save
router.post('/save', async (req, res) => {
  try {
    const { userId, title, company, location, salary, applyLink, description, employmentType } = req.body;

    if (!userId || !title || !company) {
      return res.status(400).json({
        success: false,
        message: 'User ID, title, and company are required'
      });
    }

    const Application = require('../models/Application');

    const jobApplication = {
      userId,
      jobTitle: title,
      companyName: company,
      location: location || 'Not specified',
      expectedSalary: salary || 'Not disclosed',
      jobPostingLink: applyLink || '',
      coverLetter: description || '',
      status: 'Applied',
      dateApplied: new Date(),
      jobType: employmentType || 'Full-time'
    };

    const savedJob = await Application.create(jobApplication);

    res.status(201).json({
      success: true,
      message: 'Job saved to your tracker successfully',
      data: savedJob
    });

  } catch (error) {
    console.error('Error saving job:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save job to tracker'
    });
  }
});

module.exports = router;
