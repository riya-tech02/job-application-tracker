# Job Application Form & Tracker

A full-stack MERN application for managing job applications with user authentication, application tracking, and admin dashboard with analytics.

##  Features

### User Features (Applicants)
- ✅ User registration and login with JWT authentication
- ✅ Comprehensive job application form with 5 steps:
  - Personal details
  - Education information
  - Work experience (multiple entries)
  - Skills, certifications, and resume upload
  - Job preferences and location
- ✅ Application tracking dashboard
- ✅ Filter applications by status
- ✅ View detailed application information
- ✅ Admin notes visibility

### Admin Features
- ✅ Admin dashboard with comprehensive analytics
- ✅ View all applications with filters
- ✅ Search by name, email, or role
- ✅ Update application status
- ✅ Add notes/comments to applications
- ✅ Download applicant resumes
- ✅ Interactive charts and statistics:
  - Status distribution (Pie chart)
  - Top 5 applied roles (Bar chart)
  - Most common skills (Bar chart)
  - Total applications count
  - Status-wise breakdown

### Additional Features
- ✅ Dark mode toggle
- ✅ Responsive design
- ✅ Secure file upload (PDF/DOC/DOCX)
- ✅ Role-based access control
- ✅ Password encryption
- ✅ Multi-step form with progress indicator

## 📋 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Recharts (for analytics)
- Lucide React (icons)

## 📁 Project Structure

```
job-application-tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── applicationController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── applications.js
│   │   └── admin.js
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── application/
│   │   │   ├── admin/
│   │   │   └── common/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Step 1: Clone/Create Project Directory

```bash
mkdir job-application-tracker
cd job-application-tracker
```

### Step 2: Backend Setup

```bash
# Create backend directory
mkdir backend
cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express mongoose bcryptjs jsonwebtoken dotenv cors multer

# Install dev dependencies
npm install --save-dev nodemon

# Create directories
mkdir config controllers middleware models routes uploads
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-tracker
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Step 3: Frontend Setup

```bash
# Go back to root directory
cd ..

# Create React app with Vite
npm create vite@latest frontend -- --template react
cd frontend

# Install dependencies
npm install

# Install additional packages
npm install axios react-router-dom recharts lucide-react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

### Step 5: Copy All Code Files

Copy all the code from the artifacts I created into their respective files following the project structure shown above.

### Step 6: Run the Application

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

## 👤 Default Users

### Creating an Admin Account

1. First, register a regular user through the frontend
2. Then, manually update the user role in MongoDB:

Using MongoDB Compass:
1. Connect to your database
2. Navigate to `job-tracker` database → `users` collection
3. Find your user and edit the document
4. Change `role` field from `"applicant"` to `"admin"`
5. Save the document

Using MongoDB Shell:
```javascript
use job-tracker
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Test Accounts

After setup, create these accounts for testing:

**Regular User:**
- Email: user@example.com
- Password: password123

**Admin User:**
- Email: admin@example.com
- Password: admin123
- (Remember to change role to "admin" in database)

##  Usage Guide

### For Applicants

1. **Register**: Create a new account
2. **Login**: Access your dashboard
3. **Submit Application**: 
   - Fill out 5-step application form
   - Upload resume (PDF/DOC/DOCX, max 5MB)
   - Submit application
4. **Track Applications**: 
   - View all your applications
   - Filter by status
   - Search by role
   - View admin comments

### For Admins

1. **Login**: Login with admin credentials
2. **Dashboard**: View analytics and statistics
3. **Manage Applications**:
   - View all applications
   - Filter and search
   - Update application status
   - Add notes for applicants
   - Download resumes
4. **Analytics**: View charts for:
   - Status distribution
   - Top applied roles
   - Most common skills

##  API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user (Protected)
```

### Applications (Protected)
```
POST   /api/applications                - Submit application
GET    /api/applications/my-applications - Get user's applications
GET    /api/applications/:id            - Get single application
PUT    /api/applications/:id            - Update application
DELETE /api/applications/:id            - Delete application
```

### Admin (Protected + Admin Only)
```
GET    /api/admin/applications           - Get all applications
PUT    /api/admin/applications/:id/status - Update application status
GET    /api/admin/analytics              - Get analytics data
DELETE /api/admin/applications/:id       - Delete application
```

##  Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT authentication with secure tokens
- Protected routes with middleware
- Role-based access control
- File upload validation
- XSS protection
- CORS configuration
- Input sanitization

##  Customization

### Changing Colors
Edit `frontend/tailwind.config.js` to customize colors:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // Add more custom colors
    }
  }
}
```

### Adding More Fields
1. Update Application model in `backend/models/Application.js`
2. Update ApplicationForm component in frontend
3. Update validation logic

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. Push code to GitHub
2. Create account on Railway.app or Render.com
3. Create new project from GitHub
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
5. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Create account on Vercel or Netlify
3. Import project
4. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.com/api`
5. Deploy

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running
- Verify connection string in `.env`
- Check firewall settings
- For Atlas: Whitelist your IP address

### CORS Errors
- Verify backend CORS configuration
- Check frontend API URL in `.env`
- Ensure both servers are running

### File Upload Issues
- Create `uploads` folder in backend
- Check file size limits
- Verify multer configuration
- Check file permissions

### JWT Token Errors
- Clear browser localStorage
- Check JWT_SECRET in `.env`
- Verify token expiration time

## 📝 Database Schema

### User Schema
```javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (applicant/admin),
  createdAt: Date
}
```

### Application Schema
```javascript
{
  userId: ObjectId,
  fullName: String,
  email: String,
  phone: String,
  address: String,
  linkedIn: String,
  github: String,
  portfolio: String,
  highestQualification: String,
  universityName: String,
  graduationYear: Number,
  gpa: String,
  workExperience: [{
    companyName, role, startDate, endDate,
    currentlyWorking, responsibilities
  }],
  skills: [String],
  certifications: [String],
  resumeUrl: String,
  coverLetter: String,
  desiredRole: String,
  expectedSalary: String,
  locationPreferences: [String],
  status: String (Applied/Under Review/Interview/Rejected/Accepted),
  adminNotes: String,
  submittedAt: Date,
  updatedAt: Date
}
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request



## Support

For issues or questions:
1. Check console errors (F12)
2. Check backend terminal logs
3. Verify environment variables
4. Ensure MongoDB is running
5. Check all dependencies are installed

## Acknowledgments

- React Team
- MongoDB Team
- Express.js Team
- Tailwind CSS Team
- Recharts Team

---

**Made with  for efficient job application management**