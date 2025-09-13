import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { updateFilters } from '../store/slices/storeSlice';

const SortDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const sortBy = useAppSelector(state => state.store.filters.sortBy);

    const sortOptions = [
        { value: 'name', label: 'Item Name' },
        { value: 'price-high', label: 'Higher Price' },
        { value: 'price-low', label: 'Lower Price' }
    ];

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
                <span className="text-white text-sm">Sort by:</span>
                <select
                    value={sortBy}
                    onChange={(e) => dispatch(updateFilters({ sortBy: e.target.value as any }))}
                    className="cursor-pointer bg-[#1A1A1F] border-b border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-emerald-400"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SortDropdown;