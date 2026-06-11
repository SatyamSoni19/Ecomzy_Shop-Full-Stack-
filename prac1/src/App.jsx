import React, { useState, useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import { fetchCart, clearCartLocal } from './routes/slices/CartSlice';
import { fetchFavourites, clearFavouritesLocal } from './routes/slices/LikeSlice';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme, setUser } = useContext(AppContext);
  const dispatch = useDispatch();

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
          // Hydrate cart & favourites from MongoDB
          dispatch(fetchCart());
          dispatch(fetchFavourites());
        } else {
          setIsAuthenticated(false);
          setUser(null);
          // Clear Redux state for guest
          dispatch(clearCartLocal());
          dispatch(clearFavouritesLocal());
          // Clean up any stale UI data from old localStorage system
          localStorage.removeItem("user");
          localStorage.removeItem("cart");
          localStorage.removeItem("favorites");
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
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="w-12 h-12 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF]">
      {/* Navbar always visible — adapts UI based on auth state */}
      <div className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#262626]">
        <Navbar setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
      </div>

      <Routes>
        {/* Login aur Signup me setIsAuthenticated pass karo */}
        <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />

        {/* Home & MostWanted are always accessible (even for guests) */}
        <Route path="/" element={<Home />} />
        <Route path="/mostwanted" element={<MostWanted />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Protected routes — guests get redirected to login */}
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/trending" element={isAuthenticated ? <Trending /> : <Navigate to="/login" />} />
        <Route path="/favourites" element={isAuthenticated ? <Favourites /> : <Navigate to="/login" />} />

        {/* Admin Route */}
        <Route path="/admin" element={
          <AdminRoute isAuthenticated={isAuthenticated}>
            <AdminDashboard />
          </AdminRoute>
        } />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

      {/* Footer component */}
      <Footer />

      {/* Toaster container */}
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />

      {/* AI Chatbot - Only visible when logged in */}
      {isAuthenticated && <Chatbot />}
    </div>
  );
}

export default App;