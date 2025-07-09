"use client";

// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '@/lib/auth'; // Import your token functions
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  isAdmin: boolean;
  login: (token: string, userName: string, isAdmin: boolean) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define the AuthProvider component that will wrap your app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded: any = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        console.log(decoded);  // Check if the decoded token contains the 'isAdmin' field
        setIsAuthenticated(true);
        setUserName(decoded.name || 'User');
        setIsAdmin(!!decoded.isAdmin);
        console.log("User info from token", { decoded, isAdmin: decoded.isAdmin, userName: decoded.name });
      } catch (error) {
        console.log("Error decoding token", error);
        removeToken();
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUserName(null);
    }
  }, []);

  // Login function
  const login = (token: string, userName: string, isAdmin: boolean) => {
    setToken(token); // Save token in localStorage
    setIsAuthenticated(true);
    setUserName(userName); // Save username from the backend
    setIsAdmin(isAdmin); // Save admin status from the backend
    //  window.location.reload();
    console.log("User logged in", { userName, isAdmin, token });
  };

  // Logout function
  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUserName(null);
    setIsAdmin(false);
    //  window.location.reload();
    console.log("User logged out");
        router.push("/");  // Redirect to the home page after logout

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, isAdmin, login, logout }}>
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};
