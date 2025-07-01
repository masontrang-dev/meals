import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface MealCardProps {
  id: string;
  image: string;
  title: string;
  description?: string;
  calories?: number;
}

const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  );
};

const MealCard: React.FC<MealCardProps> = ({
  id,
  image,
  title,
  description,
  calories,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const touch = isTouchDevice();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (touch && expanded) {
      timeoutRef.current = setTimeout(() => {
        setExpanded(false);
      }, 2000);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
    if (!expanded && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [expanded, touch]);

  // Always navigate to ViewMeal on click
  const handleCardClick = () => {
    navigate(`/meals/${id}`);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/meals/${id}`);
  };

  return (
    <div
      className={`relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-200 ${
        expanded ? "scale-105 shadow-xl z-10" : ""
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => {
        if (!touch) setExpanded(true);
      }}
      onMouseLeave={() => {
        if (!touch) setExpanded(false);
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
    >
      <img
        src={image}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-200 ${
          expanded ? "brightness-75" : ""
        }`}
      />
      {/* Always show title at the bottom, even when not expanded */}
      <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-2 py-1 rounded-b-xl text-sm font-semibold truncate">
        {title}
      </div>
      {/* Show details on expand */}
      {expanded && (
        <div className="absolute bottom-0 left-0 w-full bg-black/80 text-white p-4 rounded-b-xl transition-all duration-200 flex flex-col gap-1 z-10">
          <div className="font-bold text-lg truncate" title={title}>
            {title}
          </div>
          {description && <div className="text-sm mt-1">{description}</div>}
          <div className="flex items-center gap-2 mt-1">
            {calories && (
              <div className="text-xs opacity-80">{calories} kcal</div>
            )}
            <button
              className="ml-1 p-1 rounded-full bg-white/90 text-black hover:bg-white transition-colors text-xs shadow flex items-center"
              onClick={handleViewDetails}
              aria-label="View Details"
            >
              <span className="inline-block align-middle">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCard;
