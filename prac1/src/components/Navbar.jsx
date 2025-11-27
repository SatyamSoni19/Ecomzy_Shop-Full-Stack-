import React, { useState, useContext, useRef, useEffect } from 'react';
import { FaShoppingCart, FaFilter, FaUser, FaMoon } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const filterRef = useRef(null);
  const userMenuRef = useRef(null);

  const { selectedCategories, setSelectedCategories, user } = useContext(AppContext);

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

  return (
    <div className="text-white relative">
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
        <div className='hidden md:flex justify-between items-center relative'>
          {/* Filter Button */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${showFilter
                ? 'bg-blue-600 text-white shadow-lg'
                : 'hover:bg-gray-700'
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
              <div className="absolute top-14 right-0 bg-gradient-to-br from-white to-gray-50 text-gray-800 shadow-2xl rounded-xl w-64 p-4 border border-gray-200 animate-slideDown z-50">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                  <h3 className="font-bold text-lg text-gray-700">Filter by Category</h3>
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
                          : 'hover:bg-gray-100 border-2 border-transparent'
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
                              : 'bg-white border-gray-300'
                              }`}
                          >
                            {isSelected && <MdCheck className="text-white text-sm" />}
                          </div>
                        </div>
                        <span className={`capitalize font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
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
          <NavLink to='/Cart' className="p-3 rounded-lg transition-all duration-200 hover:bg-gray-700">
            <FaShoppingCart className='text-xl' />
          </NavLink>

          {/* User Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-3 rounded-lg transition-all duration-200 hover:bg-gray-700"
            >
              <FaUser className='text-xl' />
            </button>

            {showUserMenu && (
              <div className="absolute top-14 right-0 bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 shadow-2xl rounded-xl w-64 p-4 border border-gray-200 animate-slideDown z-50">
                {/* Welcome Message */}
                <div className="mb-4 pb-3 border-b border-gray-300">
                  <p className="text-sm text-gray-500">Welcome</p>
                  <p className="text-lg font-bold text-gray-800">{user?.name || user?.email || 'User'}</p>
                </div>

                {/* Menu Items */}
                <div className="space-y-2">
                  {/* About Button */}
                  <button
                    onClick={() => {
                      setShowAboutModal(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium text-gray-700"
                  >
                    About
                  </button>

                  {/* Contact Us Button */}
                  <button
                    onClick={() => {
                      setShowContactModal(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium text-gray-700"
                  >
                    Contact Us
                  </button>

                  {/* Theme Toggle (Placeholder) */}
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium text-gray-700"
                  >
                    <span>Theme</span>
                    <FaMoon className="text-sm" />
                  </button>

                  {/* Logout Button (Non-functional) */}
                  <button
                    className="w-full text-left px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200 font-semibold text-white mt-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className='cursor-pointer md:hidden' onClick={menuClickHandler}>
          <IoIosMenu className='text-2xl' />
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-[45vh] w-[60%] bg-gray-900 text-white z-50 p-6 flex flex-col gap-5 shadow-lg transition-transform duration-300">
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
            <div className="bg-gradient-to-br from-white to-gray-50 text-black rounded-lg p-3 mt-2">
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
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'
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
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected
                            ? 'bg-blue-600 border-blue-600'
                            : 'bg-white border-gray-300'
                            }`}
                        >
                          {isSelected && <MdCheck className="text-white text-xs" />}
                        </div>
                      </div>
                      <span className={`capitalize text-sm ${isSelected ? 'text-blue-700 font-medium' : ''}`}>
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
      {showAboutModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setShowAboutModal(false)}>
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <IoClose className="text-2xl" />
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to our E-commerce platform! We are dedicated to providing you with the best shopping experience.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our platform offers a wide range of products including electronics, clothing, jewelry, and more. We strive to deliver quality products at competitive prices.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Thank you for choosing us for your shopping needs!
            </p>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {showContactModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setShowContactModal(false)}>
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <IoClose className="text-2xl" />
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowContactModal(false); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  placeholder="Your message"
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;