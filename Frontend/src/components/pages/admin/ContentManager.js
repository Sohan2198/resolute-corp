import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../../contexts/AdminContext';

const ContentManager = () => {
  const { logout, isLoggedIn } = useAdmin();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/admin');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
            Dashboard
          </Link>
          <Link to="/admin/dashboard/blog" className="block px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
            Blog Manager
          </Link>
          <Link to="/admin/dashboard/content" className="block px-4 py-3 bg-[#0E4669] rounded-lg transition-colors text-white">
            Content Manager
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Manager</h1>
          <Link to="/admin/dashboard" className="md:hidden text-[#0E4669] font-medium">Back to Dashboard</Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden text-center py-20 px-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            The Content Manager is currently under development. In future updates, you will be able to edit static page content directly from here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
