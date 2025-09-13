import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, PricingOption, StoreState } from "../../types";
import { StoreService } from "../../services/api";

const initialFilters: FilterState = {
  selectedPricing: [],
  searchKeyword: "",
  sortBy: "name",
  priceRange: [0, 999],
};

const initialState: StoreState = {
  allItems: [],
  filteredItems: [],
  displayedItems: [],
  filters: initialFilters,
  isLoading: false,
  hasMoreItems: true,
  currentPage: 1,
  itemsPerPage: 12,
};

export const loadStoreItems = createAsyncThunk(
  "store/loadStoreItems",
  async () => {
    return await StoreService.fetchStoreItems();
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      applyFiltersAndSort(state);
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
      state.currentPage = 1;
      applyFiltersAndSort(state);
    },
    loadMoreItems: (state) => {
      if (state.hasMoreItems) {
        state.currentPage += 1;
        updateDisplayedItems(state);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStoreItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadStoreItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allItems = action.payload;
        applyFiltersAndSort(state);
      })
      .addCase(loadStoreItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

function applyFiltersAndSort(state: StoreState) {
  let filtered = [...state.allItems];

  // pricing filter
  if (state.filters.selectedPricing.length > 0) {
    filtered = filtered.filter((item) =>
      state.filters.selectedPricing.includes(item.pricingOption)
    );
  }

  // search filter
  if (state.filters.searchKeyword.trim()) {
    const keyword = state.filters.searchKeyword.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.creator.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword)
    );
  }

  // price range filter
  if (state.filters.selectedPricing.includes(PricingOption.PAID)) {
    filtered = filtered.filter((item) => {
      if (item.pricingOption !== PricingOption.PAID) return true;
      return (
        item.price >= state.filters.priceRange[0] &&
        item.price <= state.filters.priceRange[1]
      );
    });
  }

  // sorting
  filtered.sort((a, b) => {
    switch (state.filters.sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  state.filteredItems = filtered;
  updateDisplayedItems(state);
}

function updateDisplayedItems(state: StoreState) {
  const startIndex = 0;
  const endIndex = state.currentPage * state.itemsPerPage;
  state.displayedItems = state.filteredItems.slice(startIndex, endIndex);
  state.hasMoreItems = endIndex < state.filteredItems.length;
}

export const { updateFilters, resetFilters, loadMoreItems } =
  storeSlice.actions;
export default storeSlice.reducer;
