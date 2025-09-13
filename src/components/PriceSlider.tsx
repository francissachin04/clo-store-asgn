import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { updateFilters } from "../store/slices/storeSlice";
import { PricingOption } from "../types";

const PriceSlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPricing, priceRange } = useAppSelector(state => state.store.filters);
  const sliderRef = useRef<HTMLDivElement>(null); // reference to the slider

  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  const isPaidSelected = selectedPricing.includes(PricingOption.PAID);

  // Converts a price value to a percentage position on the slider (0-100%)
  const getPositionFromValue = (value: number) => {
    return ((value - 0) / (999 - 0)) * 100;
  };

  /**
   * 
   * @param clientX - The X coordinate of the mouse event.
   * This function calculates the slider value based on the mouse position.
   * @returns The calculated slider value.
   */
  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(percentage * 999);
  };

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  /**
   * 
   * Handles mouse movement when dragging the slider indicators.
   * @returns void
   */
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newValue = getValueFromPosition(e.clientX);

    if (isDragging === 'min') {
      const newMin = Math.max(0, Math.min(newValue, priceRange[1] - 1));
      dispatch(updateFilters({ priceRange: [newMin, priceRange[1]] }));
    } else {
      const newMax = Math.min(999, Math.max(newValue, priceRange[0] + 1));
      dispatch(updateFilters({ priceRange: [priceRange[0], newMax] }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, priceRange]);

  if (!isPaidSelected) return null; //render nothing if "Paid" is not selected

  const minPos = getPositionFromValue(priceRange[0]);
  const maxPos = getPositionFromValue(priceRange[1]);

  return (
    <div className="flex items-center gap-4 w-56">
      <span className="text-sm text-gray-300">${priceRange[0]}</span>

      <div
        ref={sliderRef}
        className="relative flex-1 select-none"
      >
        <div className="absolute top-1/2 w-full h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>

        {/* Active Range */}
        <div
          className="absolute top-1/2 h-2 bg-emerald-400 rounded-full transform -translate-y-1/2"
          style={{
            left: `${minPos}%`,
            width: `${maxPos - minPos}%`
          }}
        />

        {/* Min indicator */}
        <div
          className={`absolute top-1/2 w-5 h-5 bg-white border-2 border-emerald-400 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-grab shadow-md z-20 ${isDragging === 'min' ? 'scale-110 cursor-grabbing' : ''
            }`}
          style={{ left: `${minPos}%` }}
          onMouseDown={handleMouseDown('min')}
        />

        {/* Max indicator */}
        <div
          className={`absolute top-1/2 w-5 h-5 bg-white border-2 border-emerald-400 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-grab shadow-md z-20 ${isDragging === 'max' ? 'scale-110 cursor-grabbing' : ''
            }`}
          style={{ left: `${maxPos}%` }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>

      <span className="text-sm text-gray-300">${priceRange[1]}</span>
    </div>

  );
};

export default PriceSlider;