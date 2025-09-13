import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { updateFilters } from '../store/slices/storeSlice';

const SearchInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const searchKeyword = useAppSelector(state => state.store.filters.searchKeyword);
    const [inputValue, setInputValue] = useState(searchKeyword);

    useEffect(() => {
        //debounces the input
        const timeoutId = setTimeout(() => {
            dispatch(updateFilters({ searchKeyword: inputValue }));
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [inputValue, dispatch]);

    return (
        <div className="relative">
            <div className="flex items-center gap-3">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Find the items you're looking for"
                        className="bg-[#1f1f23] w-full h-14 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                    />
                    <button className="!bg-transparent absolute right-3 top-1/2 transform -translate-y-1/2">
                        🔍
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchInput;