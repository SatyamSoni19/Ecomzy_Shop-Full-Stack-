import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import FavouriteItem from '../components/FavouriteItem';
import { AppContext } from '../context/AppContext';
import { products as allProducts } from '../data';

const Favourites = () => {

  // like is now an array of product IDs from MongoDB
  const likeIds = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const { theme } = useContext(AppContext);

  // Resolve product IDs to full product objects from data.js
  const likeItems = likeIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean);

  // Premium dark luxury theme styles
  const bgClass = 'bg-[#0A0A0A]';
  const textClass = 'text-[#FFFFFF]';
  const titleClass = 'text-[#10B981] uppercase tracking-wider';

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 ${bgClass}`}>
      {
        likeItems.length > 0 ? (
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 py-10">

            {/* Left Section: Favourites Items */}
            <div className="flex-1">
              <h1 className={`text-2xl font-bold mb-6 ${titleClass}`}>Your Favourites</h1>
              {
                likeItems.map((item, index) => (
                  <FavouriteItem key={item.id} item={item} itemIndex={index} />
                ))
              }
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 space-y-6">
            <h1 className={`text-2xl font-bold ${textClass}`}>No Favourites Yet!!</h1>
            <NavLink to={"/"}>
              <button className="bg-[#10B981] hover:bg-[#059669] text-[#0A0A0A] px-6 py-2.5 rounded transition duration-300 uppercase tracking-wider font-semibold cursor-pointer active:scale-98 shadow-md">
                Go Choose Some
              </button>
            </NavLink>
          </div>
        )
      }
    </div>
  )
}

export default Favourites