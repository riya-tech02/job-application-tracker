const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  updateApplicationStatus,
  getAnalytics,
  deleteApplication
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// All routes are protected and admin only
router.use(protect);
router.use(admin);

// Get all applications
router.get('/applications', getAllApplications);

// Update application status
router.put('/applications/:id/status', updateApplicationStatus);

// Get analytics
router.get('/analytics', getAnalytics);

// Delete application
router.delete('/applications/:id', deleteApplication);

module.exports = router;