import React, { useState, useContext } from 'react';
import { FaShoppingCart, FaFilter, FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { selectedCategories, setSelectedCategories } = useContext(AppContext);

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

  return (
    <div className="text-white relative">
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <div className='ml-5'>
          <img src='../logo.png' className='h-8 md:h-14' />
        </div>

        {/* Links */}
        <div className='hidden md:flex justify-between gap-5'>
          <NavLink to='/'><p>Home</p></NavLink>
          <NavLink to='/MostWanted'><p>MostWanted</p></NavLink>
          <NavLink to='/Trending'><p>Trending</p></NavLink>
          <NavLink to='/Favourites'><p>Favourites</p></NavLink>
        </div>

        {/* Icons */}
        <div className='hidden md:flex justify-between gap-4 items-center relative'>
          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2"
            >
              <FaFilter className="text-xl cursor-pointer" />
            </button>

            {showFilter && (
              <div className="absolute top-10 right-0 bg-white text-black shadow-lg rounded-md w-48 p-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span className="capitalize">{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <NavLink to='/Cart'><FaShoppingCart className='text-xl' /></NavLink>

          {/* User */}
          <NavLink to=''><FaUser className='text-xl' /></NavLink>
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
          </button>

          {showFilter && (
            <div className="bg-white text-black rounded-md p-3 mt-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <span className="capitalize">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;