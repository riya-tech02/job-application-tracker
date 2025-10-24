const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getMyApplications,
  getApplication,
  updateApplication,
  deleteApplication
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes are protected
router.use(protect);

// Submit application with resume upload
router.post('/', upload.single('resume'), submitApplication);

// Get user's applications
router.get('/my-applications', getMyApplications);

// Get single application
router.get('/:id', getApplication);

// Update application
router.put('/:id', updateApplication);

// Delete application
router.delete('/:id', deleteApplication);

module.exports = router;