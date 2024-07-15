import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo, setUserInfo, clearUserInfo } from '../../services/userservice'; // Adjust the path as necessary

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [refresh,setRefresh]=useState(false)

  useEffect(() => {
    const storedUser = getUserInfo();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); // Ensure to set false if no stored user
    }
  }, []);

  useEffect(()=>{
    setRefresh(!refresh)
  },[isAuthenticated])

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://13.60.35.232:8000/api/sign_in', credentials);

      if (response.status === 200 && response.data.id) {
        const userInfo = response.data;

        setUserInfo(userInfo); // Store user info in localStorage
        setUser(userInfo);
        setIsAuthenticated(true);

        return userInfo;
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  };

  const logout = () => {
    clearUserInfo(); // Clear user info from localStorage
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
