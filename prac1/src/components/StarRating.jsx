import React, { useState } from "react";

const StarRating = ({ rating = 0, onRate, readonly = false, size = "text-2xl", showCount = false, count = 0 }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (star) => {
    if (!readonly && onRate) {
      onRate(star);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          const isHalf = !isFilled && star - 0.5 <= displayRating;

          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => !readonly && setHoverRating(star)}
              onMouseLeave={() => !readonly && setHoverRating(0)}
              className={`${size} transition-all duration-150 ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
                } bg-transparent border-none p-0 leading-none`}
              disabled={readonly}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              {isFilled ? (
                <svg viewBox="0 0 24 24" className="w-[1em] h-[1em]" fill="#10B981" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ) : isHalf ? (
                <svg viewBox="0 0 24 24" className="w-[1em] h-[1em]">
                  <defs>
                    <linearGradient id={`half-${star}`}>
                      <stop offset="50%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#374151" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#half-${star})`} />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-[1em] h-[1em]" fill="#374151" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      {showCount && (
        <span className="text-sm text-[#A1A1AA]">
          ({count} {count === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
};

export default StarRating;
