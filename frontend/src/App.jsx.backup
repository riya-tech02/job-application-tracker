import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ApplicationForm from './components/application/ApplicationForm';
import ApplicationList from './components/application/ApplicationList';
import ApplicationDetails from './components/admin/ApplicationDetails';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes - Applicant */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <ApplicationList />
                </PrivateRoute>
              }
            />
            <Route
              path="/apply"
              element={
                <PrivateRoute>
                  <ApplicationForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/application/:id"
              element={
                <PrivateRoute>
                  <ApplicationDetails />
                </PrivateRoute>
              }
            />

            {/* Protected Routes - Admin Only */}
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/application/:id"
              element={
                <PrivateRoute adminOnly>
                  <ApplicationDetails />
                </PrivateRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;