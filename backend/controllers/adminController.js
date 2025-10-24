const Application = require('../models/Application');
const User = require('../models/User');

// @desc    Get all applications (Admin)
// @route   GET /api/admin/applications
// @access  Private/Admin
exports.getAllApplications = async (req, res) => {
  try {
    const { status, role, search, skills } = req.query;
    
    let query = {};
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Filter by desired role
    if (role) {
      query.desiredRole = { $regex: role, $options: 'i' };
    }
    
    // Search by name or email
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by skills
    if (skills) {
      query.skills = { $in: [skills] };
    }

    const applications = await Application.find(query)
      .populate('userId', 'fullName email')
      .sort({ submittedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status (Admin)
// @route   PUT /api/admin/applications/:id/status
// @access  Private/Admin
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status || application.status;
    application.adminNotes = adminNotes || application.adminNotes;
    application.updatedAt = Date.now();

    const updatedApplication = await application.save();

    res.json(updatedApplication);
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get application analytics (Admin)
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res) => {
  try {
    // Total applications
    const totalApplications = await Application.countDocuments();

    // Applications by status
    const statusCounts = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Applications by role
    const roleCounts = await Application.aggregate([
      {
        $group: {
          _id: '$desiredRole',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Most common skills
    const skillCounts = await Application.aggregate([
      { $unwind: '$skills' },
      {
        $group: {
          _id: '$skills',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);

    // Applications over time (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const applicationsOverTime = await Application.aggregate([
      {
        $match: {
          submittedAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$submittedAt' },
            month: { $month: '$submittedAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Recent applications
    const recentApplications = await Application.find()
      .sort({ submittedAt: -1 })
      .limit(5)
      .select('fullName desiredRole status submittedAt');

    res.json({
      totalApplications,
      statusCounts,
      roleCounts,
      skillCounts,
      applicationsOverTime,
      recentApplications
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete application (Admin)
// @route   DELETE /api/admin/applications/:id
// @access  Private/Admin
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await application.deleteOne();
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: error.message });
  }
};