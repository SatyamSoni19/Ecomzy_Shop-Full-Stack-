import React, { useState, useContext, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaShoppingCart, FaFilter, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { clearCartLocal } from '../routes/slices/CartSlice';
import { clearFavouritesLocal } from '../routes/slices/LikeSlice';
import FilterSidebar from './FilterSidebar';

const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:4000"
  : "https://ecomzy-shop-full-stack.onrender.com";

const Navbar = ({ setIsAuthenticated, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactFormData, setContactFormData] = useState({ name: '', email: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedCategories, setSelectedCategories, user, setUser, theme, toggleTheme } = useContext(AppContext);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/v1/logout`, {
        method: "POST",
        credentials: "include"
      });

      // Clear Redux cart & favourites state immediately
      dispatch(clearCartLocal());
      dispatch(clearFavouritesLocal());

      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      localStorage.removeItem("favorites");
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

  // ✅ Click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Premium dark luxury theme styles
  const textClass = 'text-[#FFFFFF]';
  const bgClass = 'bg-[#0A0A0A]';
  const dropdownBgClass = 'bg-[#111111] border border-[#262626]';
  const hoverClass = 'hover:bg-[#151515] transition-all duration-200';
  const modalBgClass = 'bg-[#111111] text-[#FFFFFF] border border-[#262626]';
  const inputBgClass = 'bg-[#151515] border-[#262626] text-[#FFFFFF] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/30';

  return (
    <div className="relative text-[#FFFFFF]">
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
          {isAuthenticated ? (
            <NavLink to='/Trending' className="nav-link-animated">
              <p>Trending</p>
            </NavLink>
          ) : (
            <button onClick={() => setShowAuthPopup(true)} className="nav-link-animated cursor-pointer bg-transparent border-none text-inherit">
              <p>Trending</p>
            </button>
          )}
          {isAuthenticated ? (
            <NavLink to='/Favourites' className="nav-link-animated">
              <p>Favourites</p>
            </NavLink>
          ) : (
            <button onClick={() => setShowAuthPopup(true)} className="nav-link-animated cursor-pointer bg-transparent border-none text-inherit">
              <p>Favourites</p>
            </button>
          )}
        </div>

        {/* Icons */}
        <div className='flex items-center gap-4 mr-5'>

          {/* Desktop Actions (Filter & Cart) */}
          <div className='hidden md:flex items-center gap-4'>
            {/* Filter Button */}
            <button
              onClick={() => setShowFilter(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${showFilter
                ? 'bg-[#F59E0B] text-[#0A0A0A] shadow-[0_0_15px_rgba(245,158,11,0.3)] font-semibold'
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

            {/* Cart */}
            {isAuthenticated ? (
              <NavLink to='/Cart' className={`p-3 rounded-lg transition-all duration-200 ${hoverClass}`}>
                <FaShoppingCart className='text-xl' />
              </NavLink>
            ) : (
              <button onClick={() => setShowAuthPopup(true)} className={`p-3 rounded-lg transition-all duration-200 cursor-pointer bg-transparent border-none text-inherit ${hoverClass}`}>
                <FaShoppingCart className='text-xl' />
              </button>
            )}
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

                {isAuthenticated ? (
                  /* ===== AUTHENTICATED USER MODAL ===== */
                  <>
                    {/* Welcome Message & Profile Image */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#262626]">
                      <div>
                        <p className="text-sm text-[#71717A]">Welcome</p>
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
                          className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 border-[#262626] transition-transform hover:scale-105"
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

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer text-left px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200 font-semibold text-white mt-2"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  /* ===== GUEST USER MODAL ===== */
                  <>
                    {/* Guest Welcome */}
                    <div className="flex flex-col items-center mb-4 pb-3 border-b border-[#262626]">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#6EE7B7]/10 flex items-center justify-center border border-[#10B981]/30 mb-3">
                        <FaUser className="text-[#10B981] text-xl" />
                      </div>
                      <p className="text-base font-semibold text-white text-center">Hey there, welcome! 👋</p>
                      <p className="text-xs text-[#71717A] text-center mt-1">Join us to unlock the full experience</p>
                    </div>

                    {/* Sign Up / Sign In Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => { setShowUserMenu(false); navigate('/signup'); }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-[#0A0A0A] font-bold uppercase tracking-wider text-xs transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-[0.97]"
                      >
                        <FiUserPlus className="text-base" />
                        Sign Up
                      </button>
                      <button
                        onClick={() => { setShowUserMenu(false); navigate('/login'); }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#151515] border border-[#262626] hover:border-[#10B981]/40 text-white font-semibold uppercase tracking-wider text-xs transition-all duration-200 cursor-pointer hover:bg-[#1A1A1A] active:scale-[0.97]"
                      >
                        <FiLogIn className="text-base" />
                        Sign In
                      </button>
                    </div>

                    {/* About & Contact still available */}
                    <div className="space-y-2 mt-3 pt-3 border-t border-[#262626]">
                      <button
                        onClick={() => {
                          setShowAboutModal(true);
                          setShowUserMenu(false);
                        }}
                        className={`w-full cursor-pointer text-left px-4 py-2 rounded-lg transition-all duration-200 font-medium ${hoverClass} ${textClass}`}
                      >
                        About
                      </button>
                      <button
                        onClick={() => {
                          setShowContactModal(true);
                          setShowUserMenu(false);
                        }}
                        className={`w-full cursor-pointer text-left px-4 py-2 rounded-lg transition-all duration-200 font-medium ${hoverClass} ${textClass}`}
                      >
                        Contact Us
                      </button>
                    </div>
                  </>
                )}
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
        <div className="fixed top-0 right-0 h-[45vh] w-[60%] z-50 p-6 flex flex-col gap-5 shadow-lg transition-transform duration-300 bg-[#111111] border-l border-[#262626] text-[#FFFFFF]">
          <IoClose
            onClick={menuClickHandler}
            className='self-end text-2xl cursor-pointer hover:text-red-400'
          />
          <NavLink to="/" onClick={menuClickHandler}>Home</NavLink>
          <NavLink to="/MostWanted" onClick={menuClickHandler}>Most Wanted</NavLink>
          {isAuthenticated ? (
            <NavLink to="/Trending" onClick={menuClickHandler}>Trending</NavLink>
          ) : (
            <button onClick={() => { menuClickHandler(); setShowAuthPopup(true); }} className="text-left cursor-pointer bg-transparent border-none text-inherit">Trending</button>
          )}
          {isAuthenticated ? (
            <NavLink to="/Favourites" onClick={menuClickHandler}>Favourites</NavLink>
          ) : (
            <button onClick={() => { menuClickHandler(); setShowAuthPopup(true); }} className="text-left cursor-pointer bg-transparent border-none text-inherit">Favourites</button>
          )}
          {isAuthenticated ? (
            <NavLink to="/Cart" onClick={menuClickHandler}>Cart</NavLink>
          ) : (
            <button onClick={() => { menuClickHandler(); setShowAuthPopup(true); }} className="text-left cursor-pointer bg-transparent border-none text-inherit">Cart</button>
          )}

          {/* Filter Button (for mobile) */}
          <button
            onClick={() => {
              setShowFilter(true);
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-2 mt-3 cursor-pointer"
          >
            <FaFilter className="text-xl" /> Filter
            {selectedCategories.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {selectedCategories.length}
              </span>
            )}
          </button>
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
            <div className="mt-6 pt-4 border-t border-[#262626]">
              <p className="text-sm opacity-75 mb-2">Created by</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-[#10B981] to-[#6EE7B7] bg-clip-text text-transparent">
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
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <IoClose className="text-2xl" />
            </button>
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1 opacity-90 text-[#A1A1AA]">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={contactFormData.name}
                  onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 focus:border-[#10B981] ${inputBgClass}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 opacity-90 text-[#A1A1AA]">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  value={contactFormData.email}
                  onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 focus:border-[#10B981] ${inputBgClass}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 opacity-90 text-[#A1A1AA]">Message</label>
                <textarea
                  placeholder="Your message"
                  rows="4"
                  value={contactFormData.message}
                  onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 focus:border-[#10B981] resize-none ${inputBgClass}`}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={contactLoading}
                className="w-full bg-[#10B981] hover:bg-[#059669] text-[#0A0A0A] font-bold py-3 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-wider cursor-pointer"
              >
                {contactLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></div>
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

      {/* Auth Required Popup (for protected nav links) */}
      {showAuthPopup && createPortal(
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn"
          onClick={() => setShowAuthPopup(false)}
        >
          <div
            className="relative bg-[#111111] border border-[#262626] rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.08)] p-8 w-[90%] max-w-sm animate-popIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuthPopup(false)}
              className="absolute top-4 right-4 text-[#71717A] hover:text-white transition-colors cursor-pointer"
            >
              <IoClose className="text-xl" />
            </button>

            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#6EE7B7]/10 flex items-center justify-center border border-[#10B981]/30">
                <svg className="w-8 h-8 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white text-center mb-2">Members Only!</h3>
            <p className="text-[#A1A1AA] text-center text-sm mb-6">
              Sign up to access Trending, Favourites, Cart & more.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setShowAuthPopup(false); navigate('/signup'); }}
                className="w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#0A0A0A] font-bold uppercase tracking-wider text-sm transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] active:scale-[0.97]"
              >
                Sign Up
              </button>
              <button
                onClick={() => { setShowAuthPopup(false); navigate('/login'); }}
                className="w-full py-3 rounded-xl bg-[#151515] border border-[#262626] hover:border-[#10B981]/40 text-white font-semibold uppercase tracking-wider text-sm transition-all duration-200 cursor-pointer hover:bg-[#1A1A1A] active:scale-[0.97]"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Render the Sidebar Portal */}
      <FilterSidebar isOpen={showFilter} onClose={() => setShowFilter(false)} />
    </div>
  );
};

export default Navbar;