import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Create context
export const AuthContext = createContext();

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) {
      return true;
    }
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      if (!['/login', '/register'].includes(window.location.pathname)) {
        navigate("/login");
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
