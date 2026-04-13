

import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // New loading state
  const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('user');

    console.log('AuthContext useEffect: Initializing check.');
    console.log('AuthContext useEffect: Token from localStorage:', token ? 'Present' : 'Not Present');
    console.log('AuthContext useEffect: Stored User Data from localStorage:', storedUserData ? 'Present' : 'Not Present');

    const verifyToken = async () => {
      setAuthLoading(true); // Start loading
      if (token) {
        try {
          const response = await fetch(`${BACKEND_BASE_URL}/api/auth/verify`, {
            method: 'GET',
            headers: {
              'x-auth-token': token,
            },
          });

          console.log('AuthContext useEffect: Verify API call status:', response.status);
          const responseData = await response.json();
          console.log('AuthContext useEffect: Verify API response data:', responseData);

          if (response.ok) {
            setIsLoggedIn(true);
            setUser(responseData);
            console.log('AuthContext useEffect: Token verified. User set.');
          } else {
            console.log('AuthContext useEffect: Token verification failed on frontend. Logging out.');
            logout();
          }
        } catch (error) {
          console.error('AuthContext useEffect: Error verifying token:', error);
          logout(); // Logout on network error or other issues
        } finally {
          setAuthLoading(false); // End loading regardless of outcome
        }
      } else {
        console.log('AuthContext useEffect: No token or user data in localStorage. Not attempting verification.');
        setIsLoggedIn(false);
        setUser(null);
        setAuthLoading(false); // End loading if no token
      }
    };

    verifyToken();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
