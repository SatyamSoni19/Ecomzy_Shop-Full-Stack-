import { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAPI, removeFromCartAPI } from "../routes/slices/CartSlice";
import { addToFavAPI, removeFromFavAPI } from "../routes/slices/LikeSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Products({ product }) {
  const { theme, user } = useContext(AppContext);
  const [isLiked, setisLiked] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux cart state — now an array of product IDs
  const cart = useSelector((state) => state.cart);
  const isAddedToCart = cart.includes(product.id);

  // Redux like state — now an array of product IDs
  const like = useSelector((state) => state.like);
  const isAlreadyLiked = like.includes(product.id);

  // Gate: if guest, show auth popup instead of performing action
  const requireAuth = (callback) => {
    if (!user) {
      setShowAuthPopup(true);
      return;
    }
    callback();
  };

  const handleDoubleClick = () => {
    requireAuth(() => {
      if (isAlreadyLiked) {
        dispatch(removeFromFavAPI(product.id));
        toast.warn("Item disliked!")
      } else {
        dispatch(addToFavAPI({ productId: product.id, title: product.title, category: product.category }));
        toast.info("Item liked!")
      }
    });
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Premium dark luxury theme styles
  const cardBgClass = 'bg-[#111111] border-[#262626] hover:border-[#10B981]/25 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] shadow-md transition-all duration-300';
  const titleClass = 'text-[#FFFFFF]';
  const descClass = 'text-[#A1A1AA]';
  const iconColorClass = 'text-[#A1A1AA] hover:text-[#10B981] transition-colors duration-200';

  return (
    <>
      <div
        className={`flex flex-col items-center justify-between 
        hover:scale-105 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 
        rounded-xl border-[2px] ${cardBgClass}`}
        onDoubleClick={handleDoubleClick}>
        <div onClick={handleProductClick} className="cursor-pointer w-full">
          <p className={`${titleClass} font-semibold text-lg text-left truncate w-40 mt-1 hover:underline`}>{product.title}</p>
        </div>
        <div>
          <p className={`w-40 ${descClass} font-normal text-[10px] text-left`}>{product.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
        </div>
        <div className="h-[180px] cursor-pointer" onClick={handleProductClick}>
          <img src={product.image} className="h-full w-full object-contain p-2 bg-white rounded-lg" alt={product.title} />
        </div>
        <div className="flex justify-between gap-12 items-center w-full mt-5">
          <div>
            <p className="text-[#10B981] font-semibold">${product.price}</p>
          </div>
          <div
            onClick={() => {
              requireAuth(() => {
                if (isAlreadyLiked) {
                  dispatch(removeFromFavAPI(product.id));
                  toast.warn("Item disliked!")
                } else {
                  dispatch(addToFavAPI({ productId: product.id, title: product.title, category: product.category }));
                  toast.info("Item liked!")
                }
              });
            }}
            className={`cursor-pointer ${iconColorClass}`}>
            {isAlreadyLiked ? (<FcLike className="text-2xl animate-pulse" />) : (<AiOutlineHeart className="text-2xl" />)}
          </div>
          <div>
            <button
              onClick={() => {
                requireAuth(() => {
                  if (isAddedToCart) {
                    dispatch(removeFromCartAPI(product.id));
                    toast.error("Item Removed!")
                  } else {
                    dispatch(addToCartAPI({ productId: product.id, title: product.title, category: product.category }));
                    toast.success("Item Added to cart!")
                  }
                });
              }}
              className={`cursor-pointer ${iconColorClass}`}>
              {isAddedToCart ? (<IoCartSharp className="text-2xl text-[#10B981]" />) : (<IoCartOutline className="text-2xl" />)}
            </button>
          </div>
        </div>
      </div>

      {/* Auth Required Popup */}
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

            {/* Lock icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#6EE7B7]/10 flex items-center justify-center border border-[#10B981]/30">
                <svg className="w-8 h-8 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white text-center mb-2">Hold on!</h3>
            <p className="text-[#A1A1AA] text-center text-sm mb-6">
              Sign up first to like products & add them to your cart.
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
    </>
  )
}

export default Products