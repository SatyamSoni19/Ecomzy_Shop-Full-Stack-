import React, { useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { MdCheck, MdGridView } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { TbRulerMeasure } from "react-icons/tb";
import { RiPriceTag3Line } from "react-icons/ri";
import { AppContext } from "../context/AppContext";
import StarRating from "./StarRating";

const FilterSidebar = ({ isOpen, onClose }) => {
  const {
    selectedCategories,
    setSelectedCategories,
    selectedSizes,
    setSelectedSizes,
    priceRange,
    setPriceRange,
    ratingFilter,
    setRatingFilter,
    allCategories,
    maxProductPrice,
  } = useContext(AppContext);

  const [localMin, setLocalMin] = useState(priceRange[0]);
  const [localMax, setLocalMax] = useState(priceRange[1]);
  const sidebarRef = useRef(null);

  // Sync local price inputs with context
  useEffect(() => {
    setLocalMin(priceRange[0]);
    setLocalMax(priceRange[1]);
  }, [priceRange]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size"];

  const toggleCategory = (cat) => {
    if (cat === "all") {
      setSelectedCategories([]);
      return;
    }
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handlePriceCommit = () => {
    const min = Math.max(0, Number(localMin) || 0);
    const max = Math.min(maxProductPrice, Number(localMax) || maxProductPrice);
    setPriceRange([min, max]);
  };

  const handleMinSlider = (e) => {
    const val = Number(e.target.value);
    if (val <= priceRange[1]) {
      setPriceRange([val, priceRange[1]]);
    }
  };

  const handleMaxSlider = (e) => {
    const val = Number(e.target.value);
    if (val >= priceRange[0]) {
      setPriceRange([priceRange[0], val]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceRange([0, maxProductPrice]);
    setRatingFilter(0);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxProductPrice ||
    ratingFilter > 0;

  if (!isOpen) return null;

  const sidebarContent = (
    <div className="fixed inset-0 z-[80] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Sidebar Panel */}
      <div
        ref={sidebarRef}
        className="relative w-[320px] max-w-[85vw] h-full bg-[#0A0A0A] border-r border-[#1A1A1A] overflow-y-auto animate-slideInLeft flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0A0A0A] px-6 pt-6 pb-4 border-b border-[#1A1A1A]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MdGridView className="text-[#10B981] text-xl" />
              <h2 className="text-white text-xl font-bold tracking-wider uppercase">
                Filters
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#1A1A1A] transition-colors text-[#71717A] hover:text-white cursor-pointer"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="mt-3 text-xs text-[#10B981] hover:text-[#6EE7B7] font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-8 filter-sidebar-scroll">

          {/* ── CATEGORIES ── */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BiCategoryAlt className="text-[#10B981] text-lg" />
              <h3 className="text-white text-sm font-bold tracking-wider uppercase">
                Categories
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* "All" pill */}
              <button
                onClick={() => toggleCategory("all")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer border ${
                  selectedCategories.length === 0
                    ? "bg-[#10B981] text-[#0A0A0A] border-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    : "bg-[#151515] text-[#A1A1AA] border-[#262626] hover:border-[#10B981]/40 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  All
                  {selectedCategories.length === 0 && (
                    <MdCheck className="text-sm" />
                  )}
                </span>
              </button>
              {allCategories.map((cat) => {
                const isActive = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide capitalize transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? "bg-[#10B981] text-[#0A0A0A] border-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                        : "bg-[#151515] text-[#A1A1AA] border-[#262626] hover:border-[#10B981]/40 hover:text-white"
                    }`}
                  >
                    {cat.length > 12 ? cat.slice(0, 12) + "…" : cat}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-[#1A1A1A]" />

          {/* ── SIZE ── */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TbRulerMeasure className="text-[#10B981] text-lg" />
              <h3 className="text-white text-sm font-bold tracking-wider uppercase">
                Size
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => {
                const isActive = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? "bg-[#10B981] text-[#0A0A0A] border-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.25)]"
                        : "bg-[#151515] text-[#A1A1AA] border-[#262626] hover:border-[#10B981]/40 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-[#1A1A1A]" />

          {/* ── PRICE RANGE ── */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <RiPriceTag3Line className="text-[#10B981] text-lg" />
              <h3 className="text-white text-sm font-bold tracking-wider uppercase">
                Price Range
              </h3>
            </div>

            {/* Dual Range Slider */}
            <div className="relative h-2 bg-[#262626] rounded-full mb-5 mt-2">
              {/* Active track */}
              <div
                className="absolute h-full bg-gradient-to-r from-[#10B981] to-[#6EE7B7] rounded-full"
                style={{
                  left: `${(priceRange[0] / maxProductPrice) * 100}%`,
                  right: `${100 - (priceRange[1] / maxProductPrice) * 100}%`,
                }}
              />
              {/* Min slider */}
              <input
                type="range"
                min={0}
                max={maxProductPrice}
                value={priceRange[0]}
                onChange={handleMinSlider}
                className="price-range-slider absolute w-full top-0 h-2 appearance-none bg-transparent pointer-events-auto z-10"
              />
              {/* Max slider */}
              <input
                type="range"
                min={0}
                max={maxProductPrice}
                value={priceRange[1]}
                onChange={handleMaxSlider}
                className="price-range-slider absolute w-full top-0 h-2 appearance-none bg-transparent pointer-events-auto z-20"
              />
            </div>

            {/* Min/Max Input Boxes */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#151515] border border-[#262626] rounded-lg p-3">
                <p className="text-[10px] text-[#71717A] font-semibold tracking-wider uppercase mb-1">
                  Min
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-[#10B981] font-bold text-sm">$</span>
                  <input
                    type="number"
                    value={localMin}
                    onChange={(e) => setLocalMin(e.target.value)}
                    onBlur={handlePriceCommit}
                    onKeyDown={(e) => e.key === "Enter" && handlePriceCommit()}
                    className="bg-transparent text-white font-bold text-sm w-full outline-none"
                    min={0}
                  />
                </div>
              </div>
              <span className="text-[#71717A] font-bold">—</span>
              <div className="flex-1 bg-[#151515] border border-[#262626] rounded-lg p-3">
                <p className="text-[10px] text-[#71717A] font-semibold tracking-wider uppercase mb-1">
                  Max
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-[#10B981] font-bold text-sm">$</span>
                  <input
                    type="number"
                    value={localMax}
                    onChange={(e) => setLocalMax(e.target.value)}
                    onBlur={handlePriceCommit}
                    onKeyDown={(e) => e.key === "Enter" && handlePriceCommit()}
                    className="bg-transparent text-white font-bold text-sm w-full outline-none"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-[#1A1A1A]" />

          {/* ── CUSTOMER RATING ── */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-[#10B981]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h3 className="text-white text-sm font-bold tracking-wider uppercase">
                Customer Rating
              </h3>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const isActive = ratingFilter === stars;
                return (
                  <button
                    key={stars}
                    onClick={() => setRatingFilter(isActive ? 0 : stars)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? "bg-[#10B981]/10 border-[#10B981]/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                        : "bg-[#111111] border-[#1A1A1A] hover:border-[#10B981]/20 hover:bg-[#151515]"
                    }`}
                  >
                    <StarRating rating={stars} readonly size="text-lg" />
                    <span className={`text-sm font-medium ${isActive ? "text-[#10B981]" : "text-[#A1A1AA]"}`}>
                      & up
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Bottom spacer */}
          <div className="h-6" />
        </div>
      </div>
    </div>
  );

  return createPortal(sidebarContent, document.body);
};

export default FilterSidebar;
