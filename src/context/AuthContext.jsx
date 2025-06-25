import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Keep token synced with localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken !== token) setToken(storedToken);
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
