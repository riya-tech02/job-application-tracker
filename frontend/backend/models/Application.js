const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Personal Details
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  linkedIn: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  
  // Education Details
  highestQualification: {
    type: String,
    required: [true, 'Highest qualification is required']
  },
  universityName: {
    type: String,
    required: [true, 'University name is required']
  },
  graduationYear: {
    type: Number,
    required: [true, 'Graduation year is required']
  },
  gpa: {
    type: String,
    required: [true, 'GPA/Percentage is required']
  },
  
  // Work Experience
  workExperience: [{
    companyName: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    currentlyWorking: {
      type: Boolean,
      default: false
    },
    responsibilities: {
      type: String,
      required: true
    }
  }],
  
  // Skills & Certifications
  skills: [{
    type: String,
    trim: true
  }],
  certifications: [{
    type: String,
    trim: true
  }],
  
  // Resume
  resumeUrl: {
    type: String,
    required: [true, 'Resume is required']
  },
  resumeFileName: {
    type: String
  },
  
  // Cover Letter
  coverLetter: {
    type: String,
    trim: true
  },
  
  // Job Preferences
  desiredRole: {
    type: String,
    required: [true, 'Desired role is required']
  },
  expectedSalary: {
    type: String,
    required: [true, 'Expected salary is required']
  },
  locationPreferences: [{
    type: String,
    trim: true
  }],
  
  // Application Status
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Interview', 'Rejected', 'Accepted'],
    default: 'Applied'
  },
  
  // Admin Notes
  adminNotes: {
    type: String,
    trim: true
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Application', applicationSchema);