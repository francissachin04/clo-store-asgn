import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { PricingOption } from '../types';
import { resetFilters, updateFilters } from '../store/slices/storeSlice';
import PriceSlider from './PriceSlider';

const FilterPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedPricing } = useAppSelector(state => state.store.filters);

    const handlePricingChange = (option: PricingOption) => {
        const newSelection = selectedPricing.includes(option)
            ? selectedPricing.filter(p => p !== option)
            : [...selectedPricing, option];

        dispatch(updateFilters({ selectedPricing: newSelection }));
    };

    const handleReset = () => {
        dispatch(resetFilters());
    };

    return (
        <div className="flex items-center justify-between w-full bg-black">
            <div className="flex items-center gap-8">
                {/* Pricing options */}
                <div className="flex items-center gap-6">
                    <span className="text-gray-400 text-sm">Pricing Option:</span>

                    <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedPricing.includes(PricingOption.PAID)}
                            onChange={() => handlePricingChange(PricingOption.PAID)}
                            className="w-4 h-4 text-emerald-400 bg-gray-800 border-gray-600 rounded focus:ring-emerald-400"
                        />
                        Paid
                    </label>

                    <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedPricing.includes(PricingOption.FREE)}
                            onChange={() => handlePricingChange(PricingOption.FREE)}
                            className="w-4 h-4 text-emerald-400 bg-gray-800 border-gray-600 rounded focus:ring-emerald-400"
                        />
                        Free
                    </label>

                    <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedPricing.includes(PricingOption.VIEW_ONLY)}
                            onChange={() => handlePricingChange(PricingOption.VIEW_ONLY)}
                            className="w-4 h-4 text-emerald-400 bg-gray-800 border-gray-600 rounded focus:ring-emerald-400"
                        />
                        View Only
                    </label>
                </div>

                {/* Pricing Slider */}
                <PriceSlider />
            </div>

            <button
                onClick={handleReset}
                className="text-gray-400 hover:text-white text-sm font-medium !bg-transparent"
            >
                RESET
            </button>
        </div>
    );
};

export default FilterPanel;
