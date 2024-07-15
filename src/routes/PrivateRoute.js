import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  

  // Ensure this useEffect is logging correctly
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  return isAuthenticated ? element :element;
};

export default PrivateRoute;
