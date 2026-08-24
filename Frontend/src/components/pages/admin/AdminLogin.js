import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../contexts/AdminContext';

const AdminLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, isLoggedIn, authLoading } = useAdmin();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      navigate('/admin/dashboard');
    }
  }, [authLoading, isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(id, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err.code, err.message);
      switch (err.code) {
        case 'auth/operation-not-allowed':
          setError('Email/Password sign-in is not enabled for this project yet.');
          break;
        case 'auth/invalid-email':
          setError('That email address is not valid.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please wait a moment and try again.');
          break;
        case 'auth/network-request-failed':
          setError('Network error — check your connection and try again.');
          break;
        default:
          setError('Invalid email or password');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Secure login for content management
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="id" className="sr-only">Admin Email</label>
              <input
                id="id"
                name="id"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#0E4669] focus:border-transparent sm:text-sm transition-colors"
                placeholder="Admin Email"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#0E4669] focus:border-transparent sm:text-sm transition-colors"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/30 py-2 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#0E4669] hover:bg-[#0c3954] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#0E4669] transition-colors shadow-lg disabled:opacity-50"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
