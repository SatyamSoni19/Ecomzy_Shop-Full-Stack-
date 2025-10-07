// ItemCard.jsx
import React from "react";
import { FcDeleteDatabase } from "react-icons/fc";

const ItemCard = ({ item, onRemove, buttonText }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg shadow-md mb-4 gap-4 w-full">
      <div className="w-[150px] h-[150px] flex-shrink-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-lg font-semibold text-gray-800">{item.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-green-600 font-bold text-lg">${item.price.toFixed(2)}</p>
          <button
            onClick={onRemove}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
          >
            <FcDeleteDatabase className="text-3xl" />
            <span className="hidden sm:inline text-sm font-medium">{buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;