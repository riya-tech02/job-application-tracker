import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Moon, Sun, LogOut, User, Briefcase, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout, darkMode, toggleDarkMode, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                JobTracker
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                {isAdmin ? (
                  <Link to="/admin" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                ) : (
                  <>
                    <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <User className="h-5 w-5" />
                      <span>My Applications</span>
                    </Link>
                    <Link to="/apply" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Apply Now
                    </Link>
                    <Link to="/global-jobs" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      <span>🌍</span>
                      <span>Global Search</span>
                    </Link>
                  </>
                )}
              </>
            )}
            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
            </button>
            {user && (
              <button onClick={handleLogout} className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
