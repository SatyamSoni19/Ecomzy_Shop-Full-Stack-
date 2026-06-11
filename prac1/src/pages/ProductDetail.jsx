import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoArrowBack } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FiMinus, FiPlus, FiShare2 } from "react-icons/fi";
import { HiOutlineShieldCheck, HiOutlineTruck } from "react-icons/hi";
import { MdOutlinePayment, MdOutlineAssignmentReturn } from "react-icons/md";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { addToCartAPI, removeFromCartAPI } from "../routes/slices/CartSlice";
import { addToFavAPI, removeFromFavAPI } from "../routes/slices/LikeSlice";
import StarRating from "../components/StarRating";
import Spinner from "../components/Spinner";

const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:4000"
  : "https://ecomzy-shop-full-stack.onrender.com";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allProducts, user } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Rating state
  const [avgRating, setAvgRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);

  // Redux state
  const cart = useSelector((state) => state.cart);
  const like = useSelector((state) => state.like);

  // Find product from data
  useEffect(() => {
    const productId = Number(id);
    const found = allProducts.find((p) => p.id === productId);
    if (found) {
      setProduct(found);
      // Set default size
      if (found.sizes && found.sizes.length > 0) {
        setSelectedSize(found.sizes[0]);
      }
    }
  }, [id, allProducts]);

  // Fetch product ratings
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/rating/${id}`);
        const data = await res.json();
        if (data.success) {
          setAvgRating(data.averageRating);
          setTotalRatings(data.totalRatings);
        }
      } catch (err) {
        console.error("Error fetching ratings:", err);
      }
    };
    if (id) fetchRatings();
  }, [id]);

  // Fetch user's own rating
  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/rating/${id}/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setUserRating(data.userRating);
        }
      } catch (err) {
        console.error("Error fetching user rating:", err);
      }
    };
    if (id && user) fetchUserRating();
  }, [id, user]);

  // Submit rating
  const handleRate = async (stars) => {
    if (!user) {
      setShowAuthPopup(true);
      return;
    }

    setRatingLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: Number(id), stars }),
      });
      const data = await res.json();
      if (data.success) {
        setUserRating(stars);
        toast.success("Rating submitted!");
        // Refetch average
        const ratingRes = await fetch(`${BASE_URL}/api/v1/rating/${id}`);
        const ratingData = await ratingRes.json();
        if (ratingData.success) {
          setAvgRating(ratingData.averageRating);
          setTotalRatings(ratingData.totalRatings);
        }
      } else {
        toast.error(data.message || "Failed to submit rating");
      }
    } catch (err) {
      toast.error("Error submitting rating");
    } finally {
      setRatingLoading(false);
    }
  };

  // Auth gate
  const requireAuth = (callback) => {
    if (!user) {
      setShowAuthPopup(true);
      return;
    }
    callback();
  };

  // Cart/Fav handlers
  const isInCart = product ? cart.includes(product.id) : false;
  const isLiked = product ? like.includes(product.id) : false;

  const handleToggleCart = () => {
    requireAuth(() => {
      dispatch(addToCartAPI({ productId: product.id, quantity, title: product.title, category: product.category }));
      toast.success(`Added ${quantity} to cart!`);
    });
  };

  const handleToggleFav = () => {
    requireAuth(() => {
      if (isLiked) {
        dispatch(removeFromFavAPI(product.id));
        toast.warn("Removed from collection");
      } else {
        dispatch(addToFavAPI({ productId: product.id, title: product.title, category: product.category }));
        toast.info("Added to collection!");
      }
    });
  };

  // Share
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
    setShowShareMenu(false);
  };

  // View Analytics
  useEffect(() => {
    if (product) {
      const recordView = async () => {
        try {
          await fetch(`${BASE_URL}/api/v1/analytics/view`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              productId: product.id,
              title: product.title,
              category: product.category
            }),
          });
        } catch (err) {
          console.error("Error recording view:", err);
        }
      };
      recordView();
    }
  }, [product]);

  // Loading
  if (!product) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Determine if product has sizes
  const hasSizes = product.sizes && product.sizes.length > 0;

  // Category badge color mapping
  const getCategoryColor = (category) => {
    const colors = {
      electronics: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      sneakers: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "men's clothing": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "women's clothing": "bg-pink-500/20 text-pink-400 border-pink-500/30",
      jewelery: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      accessories: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      sports: "bg-green-500/20 text-green-400 border-green-500/30",
      kitchen: "bg-red-500/20 text-red-400 border-red-500/30",
      beauty: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
      books: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    };
    return colors[category] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 min-h-[80vh]">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#A1A1AA] hover:text-white mb-8 transition-colors cursor-pointer group"
        >
          <IoArrowBack className="text-lg group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Products</span>
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── LEFT: Product Image ── */}
          <div className="relative">
            <div className="bg-white rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Like button on image */}
            <button
              onClick={handleToggleFav}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#111111]/80 backdrop-blur-sm border border-[#262626] flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg"
            >
              {isLiked ? (
                <FcLike className="text-xl animate-pulse" />
              ) : (
                <AiOutlineHeart className="text-xl text-white" />
              )}
            </button>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="flex flex-col gap-6">

            {/* Category Badge */}
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border w-fit ${getCategoryColor(product.category)}`}
            >
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-[#10B981]">
              ${product.price.toFixed(2)}
            </p>

            {/* Rating Display */}
            <div className="flex items-center gap-3">
              <StarRating rating={avgRating} readonly size="text-xl" />
              <span className="text-[#A1A1AA] text-sm">
                {avgRating > 0 ? avgRating.toFixed(1) : "No ratings yet"}
                {totalRatings > 0 && ` (${totalRatings} ${totalRatings === 1 ? "review" : "reviews"})`}
              </span>
            </div>

            {/* Description */}
            <p className="text-[#A1A1AA] leading-relaxed text-base">
              {product.description}
            </p>

            {/* Divider */}
            <div className="border-t border-[#262626]" />

            {/* Share */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#71717A]">Share:</span>
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-[#151515] border border-[#262626] flex items-center justify-center hover:border-[#10B981]/40 hover:bg-[#1A1A1A] transition-all cursor-pointer"
                title="Copy link"
              >
                <FiShare2 className="text-sm text-[#A1A1AA]" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-[#262626]" />

            {/* Size Selector */}
            {hasSizes && (
              <div>
                <h3 className="text-sm font-bold text-[#71717A] uppercase tracking-widest mb-3">
                  Select Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer border ${
                        selectedSize === size
                          ? "bg-white text-[#0A0A0A] border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                          : "bg-[#151515] text-[#A1A1AA] border-[#262626] hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Collection */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#262626] rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-[#1A1A1A] transition-colors cursor-pointer text-[#A1A1AA] hover:text-white"
                >
                  <FiMinus className="text-lg" />
                </button>
                <span className="w-12 h-11 flex items-center justify-center text-white font-bold text-lg border-x border-[#262626] bg-[#111111]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-[#1A1A1A] transition-colors cursor-pointer text-[#A1A1AA] hover:text-white"
                >
                  <FiPlus className="text-lg" />
                </button>
              </div>

              {/* Add to Collection Button */}
              <button
                onClick={handleToggleFav}
                className={`flex-1 min-w-[200px] py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  isLiked
                    ? "bg-[#151515] text-[#10B981] border-2 border-[#10B981]/30 hover:bg-[#10B981]/10"
                    : "bg-white text-[#0A0A0A] hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                }`}
              >
                {isLiked ? (
                  <>
                    <FcLike className="text-lg" />
                    In Collection
                  </>
                ) : (
                  <>
                    <AiOutlineHeart className="text-lg" />
                    Add to Collection
                  </>
                )}
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleToggleCart}
              className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer bg-[#10B981] text-[#0A0A0A] shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:bg-[#059669] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] active:scale-[0.98]"
            >
              Add to Cart
            </button>

            {/* Info Badges */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex items-center gap-3 bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-3">
                <HiOutlineTruck className="text-xl text-[#10B981] flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Free Shipping</p>
                  <p className="text-[10px] text-[#71717A]">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-3">
                <MdOutlineAssignmentReturn className="text-xl text-[#10B981] flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Easy Returns</p>
                  <p className="text-[10px] text-[#71717A]">30-day policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-3">
                <HiOutlineShieldCheck className="text-xl text-[#10B981] flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Secure Checkout</p>
                  <p className="text-[10px] text-[#71717A]">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-3">
                <MdOutlinePayment className="text-xl text-[#10B981] flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Flexible Payment</p>
                  <p className="text-[10px] text-[#71717A]">All cards accepted</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#262626] mt-2" />

            {/* ── Customer Rating Section ── */}
            <div className="bg-[#111111] border border-[#1A1A1A] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-1">Rate this Product</h3>
              <p className="text-xs text-[#71717A] mb-4">Share your experience with others</p>

              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#A1A1AA]">Your rating:</span>
                    <StarRating
                      rating={userRating}
                      onRate={handleRate}
                      size="text-3xl"
                    />
                  </div>
                  {userRating > 0 && (
                    <p className="text-xs text-[#10B981] font-medium">
                      ✓ You rated this product {userRating} star{userRating > 1 ? "s" : ""}
                    </p>
                  )}
                  {ratingLoading && (
                    <p className="text-xs text-[#71717A]">Saving...</p>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthPopup(true)}
                  className="text-sm text-[#10B981] hover:text-[#6EE7B7] font-semibold transition-colors cursor-pointer"
                >
                  Sign in to rate this product →
                </button>
              )}
            </div>
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

            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#6EE7B7]/10 flex items-center justify-center border border-[#10B981]/30">
                <svg className="w-8 h-8 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white text-center mb-2">Hold on!</h3>
            <p className="text-[#A1A1AA] text-center text-sm mb-6">
              Sign up first to rate products, add to cart & collection.
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
  );
};

export default ProductDetail;
