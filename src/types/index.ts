export enum PricingOption {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2,
}

export interface StoreItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  imagePath: string;
  price: number;
}

export interface FilterState {
  selectedPricing: PricingOption[];
  searchKeyword: string;
  sortBy: "name" | "price-high" | "price-low";
  priceRange: [number, number];
}

export interface StoreState {
  allItems: StoreItem[];
  filteredItems: StoreItem[];
  displayedItems: StoreItem[];
  filters: FilterState;
  isLoading: boolean;
  hasMoreItems: boolean;
  currentPage: number;
  itemsPerPage: number;
}
