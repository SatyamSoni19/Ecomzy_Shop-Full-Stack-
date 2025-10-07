import React, { useState } from 'react';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {/* Navbar sirf tab dikhao jab login ho chuka ho */}
      {isAuthenticated && (
        <div className="bg-slate-900 sticky top-0 z-50">
          <Navbar setIsAuthenticated={setIsAuthenticated}/>
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
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </div>
  );
}

export default App;