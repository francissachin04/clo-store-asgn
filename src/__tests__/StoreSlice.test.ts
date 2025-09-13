import { configureStore } from '@reduxjs/toolkit';
import storeReducer, { updateFilters, resetFilters } from '../store/slices/storeSlice';
import { PricingOption } from '../types';

describe('storeSlice', () => {
  test('should handle updateFilters', () => {
    const store = configureStore({ reducer: { store: storeReducer } });
    
    store.dispatch(updateFilters({ 
      selectedPricing: [PricingOption.PAID] 
    }));
    
    const state = store.getState().store;
    expect(state.filters.selectedPricing).toEqual([PricingOption.PAID]);
  });

  test('should handle resetFilters', () => {
    const store = configureStore({ reducer: { store: storeReducer } });
    
    // First set some filters
    store.dispatch(updateFilters({ 
      selectedPricing: [PricingOption.PAID],
      searchKeyword: 'test'
    }));
    
    // Then reset
    store.dispatch(resetFilters());
    
    const state = store.getState().store;
    expect(state.filters.selectedPricing).toEqual([]);
    expect(state.filters.searchKeyword).toBe('');
  });

  test('should handle search keyword update', () => {
    const store = configureStore({ reducer: { store: storeReducer } });
    
    store.dispatch(updateFilters({ searchKeyword: 'jacket' }));
    
    const state = store.getState().store;
    expect(state.filters.searchKeyword).toBe('jacket');
  });
});