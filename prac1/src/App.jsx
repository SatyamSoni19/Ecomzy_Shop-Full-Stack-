import React, { useState, useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Favourites from './pages/Favourites';
import MostWanted from './pages/MostWanted';
import Trending from './pages/Trending';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AppContext } from './context/AppContext';
import Chatbot from './components/Chatbot';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme, setUser } = useContext(AppContext);

  // Check for existing session on mount (Persistent Login)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const BASE_URL = window.location.hostname === "localhost"
          ? "http://localhost:4000"
          : "https://ecomzy-shop-full-stack.onrender.com";

        const response = await fetch(`${BASE_URL}/api/v1/profile`, {
          method: "GET",
          credentials: "include" // This sends the httpOnly cookie!
        });

        const data = await response.json();

        if (data.success && data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
          // We can optionally keep standard user info in localStorage for quick UI renders,
          // but true authentication now relies on this API response.
        } else {
          setIsAuthenticated(false);
          setUser(null);
          // Clean up any stale UI data
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Auth check failed on refresh", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [setUser]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark'
      ? 'bg-slate-900 text-gray-100'
      : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900'
      }`}>
      {/* Navbar sirf tab dikhao jab login ho chuka ho */}
      {isAuthenticated && (
        <div className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white/80 backdrop-blur-sm'}`}>
          <Navbar setIsAuthenticated={setIsAuthenticated} />
        </div>
      )}

      <Routes>
        {/* Login aur Signup me setIsAuthenticated pass karo */}
        <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />

        {/* Agar login nahi hai to redirect login pe */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />

        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/mostwanted" element={isAuthenticated ? <MostWanted /> : <Navigate to="/login" />} />
        <Route path="/trending" element={isAuthenticated ? <Trending /> : <Navigate to="/login" />} />
        <Route path="/favourites" element={isAuthenticated ? <Favourites /> : <Navigate to="/login" />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

      {/* Toaster container */}
      <ToastContainer position="top-center" autoClose={2000} theme={theme === 'dark' ? 'dark' : 'light'} />

      {/* AI Chatbot - Only visible when logged in */}
      {isAuthenticated && <Chatbot />}
    </div>
  );
}

export default App;