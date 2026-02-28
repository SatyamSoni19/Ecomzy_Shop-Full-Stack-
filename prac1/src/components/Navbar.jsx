import React, { useState, useContext, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaShoppingCart, FaFilter, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:4000"
  : "https://ecomzy-shop-full-stack.onrender.com";

const Navbar = ({ setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactFormData, setContactFormData] = useState({ name: '', email: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const filterRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const { selectedCategories, setSelectedCategories, user, setUser, theme, toggleTheme } = useContext(AppContext);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/v1/logout`, {
        method: "POST",
        credentials: "include"
      });

      // No need to remove "token" from localStorage anymore!
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed!");
    }
  };

  // Contact Form Handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = contactFormData;

    // Validation
    if (!name || !email || !message) {
      toast.error('Please fill all fields!');
      return;
    }

    setContactLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Message sent successfully!');
        setContactFormData({ name: '', email: '', message: '' });
        setShowContactModal(false);
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setContactLoading(false);
    }
  };

  // Image Upload Handlers
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        // You do not need to read token from localStorage anymore
        const response = await fetch(`${BASE_URL}/api/v1/upload-image`, {
          method: "POST",
          // The Authorization header is NO LONGER needed because "credentials: 'include'"
          // will attach the httpOnly cookie automatically to your request!
          credentials: "include",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
          toast.success("Profile updated!");
        } else {
          toast.error(data.message || "Upload failed");
        }
      } catch (error) {
        console.error("Error uploading image", error);
        toast.error("Error uploading image");
      }
    }
  };

  const menuClickHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  // ✅ toggle category function
  const handleCategoryChange = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  // ✅ Click outside to close filter and user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showFilter || showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilter, showUserMenu]);

  // Theme-based styles
  const textClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const bgClass = theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  const dropdownBgClass = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200';
  const hoverClass = theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-blue-100';
  const modalBgClass = theme === 'dark' ? 'bg-slate-800 text-gray-100' : 'bg-gradient-to-br from-white to-gray-100 text-gray-800';
  const inputBgClass = theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900';

  return (
    <div className={`relative transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <div className='ml-5'>
          <img src='../logo.png' className='h-8 md:h-14' />
        </div>

        {/* Links */}
        <div className='hidden md:flex justify-between gap-8'>
          <NavLink to='/' className="nav-link-animated">
            <p>Home</p>
          </NavLink>
          <NavLink to='/MostWanted' className="nav-link-animated">
            <p>MostWanted</p>
          </NavLink>
          <NavLink to='/Trending' className="nav-link-animated">
            <p>Trending</p>
          </NavLink>
          <NavLink to='/Favourites' className="nav-link-animated">
            <p>Favourites</p>
          </NavLink>
        </div>

        {/* Icons */}
        <div className='flex items-center gap-4 mr-5'>

          {/* Desktop Actions (Filter & Cart) */}
          <div className='hidden md:flex items-center gap-4'>
            {/* Filter Button */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${showFilter
                  ? 'bg-blue-600 text-white shadow-lg'
                  : hoverClass
                  }`}
              >
                <FaFilter className="text-lg" />
                {selectedCategories.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {selectedCategories.length}
                  </span>
                )}
              </button>

              {showFilter && (
                <div className={`absolute top-14 right-0 shadow-2xl rounded-xl w-64 p-4 border animate-slideDown z-50 ${dropdownBgClass}`}>
                  <div className={`flex items-center justify-between mb-3 pb-2 border-b ${theme === 'dark' ? 'border-slate-600' : 'border-gray-200'}`}>
                    <h3 className={`font-bold text-lg ${textClass}`}>Filter by Category</h3>
                    {selectedCategories.length > 0 && (
                      <button
                        onClick={() => setSelectedCategories([])}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {categories.map((cat) => {
                      const isSelected = selectedCategories.includes(cat);
                      return (
                        <label
                          key={cat}
                          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
                            ? 'bg-blue-100 border-2 border-blue-400'
                            : `${hoverClass} border-2 border-transparent`
                            }`}
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleCategoryChange(cat)}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${isSelected
                                ? 'bg-blue-600 border-blue-600'
                                : `${theme === 'dark' ? 'bg-slate-700 border-slate-500' : 'bg-white border-gray-300'}`
                                }`}
                            >
                              {isSelected && <MdCheck className="text-white text-sm" />}
                            </div>
                          </div>
                          <span className={`capitalize font-medium ${isSelected ? 'text-blue-700' : textClass}`}>
                            {cat}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <NavLink to='/Cart' className={`p-3 rounded-lg transition-all duration-200 ${hoverClass}`}>
              <FaShoppingCart className='text-xl' />
            </NavLink>
          </div>

          {/* User Profile Dropdown (Visible on Mobile) */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`p-3 rounded-lg transition-all duration-200${hoverClass}`}
            >
              <FaUser className='text-xl cursor-pointer' />
            </button>

            {showUserMenu && (
              <div className={`absolute top-14 right-0 shadow-2xl rounded-xl w-64 p-4 border animate-slideDown z-50 ${dropdownBgClass}`}>
                {/* Welcome Message & Profile Image */}
                <div className={`flex items-center justify-between mb-4 pb-3 border-b ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Welcome</p>
                    <p className={`text-lg font-bold ${textClass}`}>{user?.name || user?.email || 'User'}</p>
                  </div>

                  {/* Profile Upload */}
                  <div className="relative group">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <div
                      onClick={handleImageClick}
                      className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 transition-transform hover:scale-105 ${theme === 'dark' ? 'border-slate-500' : 'border-gray-200'}`}
                    >
                      <img
                        src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.name || 'User'}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-2">
                  {/* About Button */}
                  <button
                    onClick={() => {
                      setShowAboutModal(true);
                      setShowUserMenu(false);
                    }}
                    className={`w-full cursor-pointer text-left px-4 py-2 rounded-lg transition-all duration-200 font-medium ${hoverClass} ${textClass}`}
                  >
                    About
                  </button>

                  {/* Contact Us Button */}
                  <button
                    onClick={() => {
                      setShowContactModal(true);
                      setShowUserMenu(false);
                    }}
                    className={`w-full cursor-pointer text-left px-4 py-2 rounded-lg transition-all duration-200 font-medium ${hoverClass} ${textClass}`}
                  >
                    Contact Us
                  </button>

                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className={`w-full cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 font-medium ${hoverClass} ${textClass}`}
                  >
                    <span>Theme</span>
                    {theme === 'dark' ? <FaMoon className="text-sm" /> : <FaSun className="text-sm text-yellow-500" />}
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer text-left px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200 font-semibold text-white mt-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className='cursor-pointer md:hidden' onClick={menuClickHandler}>
            <IoIosMenu className='text-2xl' />
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      {isMenuOpen && (
        <div className={`fixed top-0 right-0 h-[45vh] w-[60%] z-50 p-6 flex flex-col gap-5 shadow-lg transition-transform duration-300 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
          <IoClose
            onClick={menuClickHandler}
            className='self-end text-2xl cursor-pointer hover:text-red-400'
          />
          <NavLink to="/" onClick={menuClickHandler}>Home</NavLink>
          <NavLink to="/MostWanted" onClick={menuClickHandler}>Most Wanted</NavLink>
          <NavLink to="/Trending" onClick={menuClickHandler}>Trending</NavLink>
          <NavLink to="/Favourites" onClick={menuClickHandler}>Favourites</NavLink>
          <NavLink to="/Cart" onClick={menuClickHandler}>Cart</NavLink>

          {/* Filter Button (for mobile) */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 mt-3"
          >
            <FaFilter className="text-xl" /> Filter
            {selectedCategories.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {selectedCategories.length}
              </span>
            )}
          </button>

          {showFilter && (
            <div className={`rounded-lg p-3 mt-2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gradient-to-br from-white to-gray-50'}`}>
              {/* Mobile Filter Content - simplified for brevity, reusing logic */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">Categories</span>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="text-xs text-blue-600 font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <label
                      key={cat}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer ${isSelected ? 'bg-blue-100' : hoverClass}`}
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCategoryChange(cat)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected
                            ? 'bg-blue-600 border-blue-600'
                            : `${theme === 'dark' ? 'bg-slate-700 border-slate-500' : 'bg-white border-gray-300'}`
                            }`}
                        >
                          {isSelected && <MdCheck className="text-white text-xs" />}
                        </div>
                      </div>
                      <span className={`capitalize text-sm ${isSelected ? 'text-blue-700 font-medium' : textClass}`}>
                        {cat}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && createPortal(
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setShowAboutModal(false)}>
          <div className={`rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative ${modalBgClass}`} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowAboutModal(false)}
              className={`absolute top-4 right-4 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <IoClose className="text-2xl" />
            </button>
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="leading-relaxed mb-4 opacity-90">
              Welcome to our E-commerce platform! We are dedicated to providing you with the best shopping experience.
            </p>
            <p className="leading-relaxed mb-4 opacity-90">
              Our platform offers a wide range of products including electronics, clothing, jewelry, and more. We strive to deliver quality products at competitive prices.
            </p>
            <p className="leading-relaxed opacity-90">
              Thank you for choosing us for your shopping needs!
            </p>

            {/* Creator Section */}
            <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
              <p className="text-sm opacity-75 mb-2">Created by</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SATYAM SONI
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Contact Us Modal */}
      {showContactModal && createPortal(
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setShowContactModal(false)}>
          <div className={`rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative ${modalBgClass}`} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowContactModal(false)}
              className={`absolute top-4 right-4 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <IoClose className="text-2xl" />
            </button>
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1 opacity-90">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={contactFormData.name}
                  onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 ${inputBgClass}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 opacity-90">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  value={contactFormData.email}
                  onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 ${inputBgClass}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 opacity-90">Message</label>
                <textarea
                  placeholder="Your message"
                  rows="4"
                  value={contactFormData.message}
                  onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${inputBgClass}`}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={contactLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {contactLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Navbar;