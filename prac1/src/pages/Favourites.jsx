import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import FavouriteItem from '../components/FavouriteItem';

const Favourites = () => {

    const {like} = useSelector((state) => state)
    const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {
        like.length > 0 ? (
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 py-10">

            {/* Left Section: Cart Items */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-green-700 mb-6">Your Favourites</h1>
              {
                like.map((item, index) => (
                  <FavouriteItem key={item.id} item={item} itemIndex={index} />
                ))
              }
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 space-y-6">
            <h1 className="text-2xl font-bold text-gray-700">No Favourites Yet!!</h1>
            <NavLink to={"/"}>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition duration-200">
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