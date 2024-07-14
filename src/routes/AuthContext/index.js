import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://13.60.35.232:8000/api/sign_in', credentials);
      
      if (response.status === 200 && response.data.id) {
        const userInfo = response.data;

        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
        setIsAuthenticated(true);

        return userInfo; // Return userInfo if login is successful
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
