const Application = require('../models/Application');

// @desc    Submit new application
// @route   POST /api/applications
// @access  Private
exports.submitApplication = async (req, res) => {
  try {
    const applicationData = {
      userId: req.user._id,
      ...req.body,
      resumeUrl: req.file ? `/uploads/${req.file.filename}` : null,
      resumeFileName: req.file ? req.file.originalname : null
    };

    // Parse work experience if it's a string
    if (typeof applicationData.workExperience === 'string') {
      applicationData.workExperience = JSON.parse(applicationData.workExperience);
    }

    // Parse arrays if they're strings
    if (typeof applicationData.skills === 'string') {
      applicationData.skills = JSON.parse(applicationData.skills);
    }
    if (typeof applicationData.certifications === 'string') {
      applicationData.certifications = JSON.parse(applicationData.certifications);
    }
    if (typeof applicationData.locationPreferences === 'string') {
      applicationData.locationPreferences = JSON.parse(applicationData.locationPreferences);
    }

    const application = await Application.create(applicationData);
    res.status(201).json(application);
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications/my-applications
// @access  Private
exports.getMyApplications = async (req, res) => {
  try {
    const { status, role } = req.query;
    
    let query = { userId: req.user._id };
    
    if (status) {
      query.status = status;
    }
    
    if (role) {
      query.desiredRole = { $regex: role, $options: 'i' };
    }

    const applications = await Application.find(query)
      .sort({ submittedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
exports.getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the application or is admin
    if (application.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this application' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the application
    if (application.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    // Don't allow updating if status is not 'Applied'
    if (application.status !== 'Applied') {
      return res.status(400).json({ message: 'Cannot update application after review has started' });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedApplication);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the application
    if (application.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this application' });
    }

    await application.deleteOne();
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: error.message });
  }
};