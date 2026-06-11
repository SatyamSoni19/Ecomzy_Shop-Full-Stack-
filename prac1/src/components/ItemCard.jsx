// ItemCard.jsx
import React, { useContext } from "react";
import { FcDeleteDatabase } from "react-icons/fc";
import { AppContext } from "../context/AppContext";

const ItemCard = ({ item, onRemove, buttonText }) => {
  const { theme } = useContext(AppContext);

  // Premium dark luxury theme styles
  const cardBgClass = 'bg-[#111111] border-[#262626] shadow-md';
  const titleClass = 'text-[#FFFFFF]';
  const descClass = 'text-[#A1A1AA]';

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg mb-4 gap-4 w-full transition-all duration-300 ${cardBgClass}`}>
      <div className="w-[150px] h-[150px] flex-shrink-0 bg-white rounded-lg p-2">
        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h1 className={`text-lg font-semibold ${titleClass}`}>{item.title}</h1>
        <p className={`text-sm line-clamp-2 ${descClass}`}>{item.description}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[#10B981] font-bold text-lg">
            ${item.price.toFixed(2)} {item.quantity > 1 && <span className="text-sm text-[#A1A1AA] font-normal ml-2">x {item.quantity}</span>}
          </p>
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