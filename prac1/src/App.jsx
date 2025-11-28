import React, { useState, useContext } from 'react';
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
  const { theme } = useContext(AppContext);

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
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />

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