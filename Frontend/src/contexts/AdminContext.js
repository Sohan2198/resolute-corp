import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in on mount
    const loggedInStatus = localStorage.getItem('resolute_admin_logged_in');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (id, password) => {
    // Read credentials from env, or use defaults
    const adminId = process.env.REACT_APP_ADMIN_ID || 'resolute';
    const adminPass = process.env.REACT_APP_ADMIN_PASS || 'resolute@2024';

    if (id === adminId && password === adminPass) {
      setIsLoggedIn(true);
      localStorage.setItem('resolute_admin_logged_in', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('resolute_admin_logged_in');
  };

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
