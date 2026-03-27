import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Adjust path as needed

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    // Optionally render a loading spinner or message while auth state is resolving
    return <div>Loading authentication...</div>;
  }

  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/login-register" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role))) {
    // If logged in but role not allowed, redirect to home or an unauthorized page
    // For simplicity, redirecting to home. Could be a specific /unauthorized page.
    return <Navigate to="/" replace />;
  }

  // If logged in and role is allowed, render the child routes/components
  return <Outlet />;
};

export default ProtectedRoute;
