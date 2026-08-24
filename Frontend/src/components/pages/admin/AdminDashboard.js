import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../../contexts/AdminContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const AdminDashboard = () => {
  const { logout, isLoggedIn } = useAdmin();
  const navigate = useNavigate();
  const [totalPosts, setTotalPosts] = useState('—');
  const [totalCategories, setTotalCategories] = useState('—');

  // Always call hooks before any early returns
  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchStats = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'blogs'));
        const posts = [];
        snapshot.forEach(d => posts.push(d.data()));
        const categories = new Set(posts.map(p => p.category).filter(Boolean));
        setTotalPosts(posts.length);
        setTotalCategories(categories.size);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, [isLoggedIn]);

  // Redirect if not logged in
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
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block px-4 py-3 bg-[#0E4669] rounded-lg transition-colors">
            Dashboard
          </Link>
          <Link to="/admin/dashboard/blog" className="block px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
            Blog Manager
          </Link>
          <Link to="/admin/dashboard/content" className="block px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
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
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Total Blog Posts</h3>
            <div className="text-4xl font-bold text-gray-900">{totalPosts}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Categories</h3>
            <div className="text-4xl font-bold text-gray-900">{totalCategories}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Storage Status</h3>
            <div className="text-xl font-semibold text-green-600 mt-2 flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              Firebase Firestore
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/admin/dashboard/blog" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#0E4669] hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#0E4669] group-hover:bg-[#0E4669] group-hover:text-white transition-colors mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h4 className="text-md font-semibold text-gray-900">Manage Blog Posts</h4>
                <p className="text-sm text-gray-500">Create, edit, or delete articles</p>
              </div>
            </Link>
            
            <Link to="/admin/dashboard/content" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#0E4669] hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#0E4669] group-hover:bg-[#0E4669] group-hover:text-white transition-colors mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-md font-semibold text-gray-900">Manage Content</h4>
                <p className="text-sm text-gray-500">Update static page content</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
