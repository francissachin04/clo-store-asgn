import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { updateFilters } from "../store/slices/storeSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useUrlFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.store.filters);
  const [searchParams, setSearchParams] = useSearchParams();

  // Loads filters from URL
  useEffect(() => {
    const urlFilters: any = {};

    const search = searchParams.get("search");
    if (search) urlFilters.searchKeyword = search;

    const pricing = searchParams.get("pricing");
    if (pricing) {
      urlFilters.selectedPricing = pricing.split(",").map(Number);
    }

    const sort = searchParams.get("sort");
    if (sort) urlFilters.sortBy = sort;

    const priceRange = searchParams.get("priceRange");
    if (priceRange) {
      const [min, max] = priceRange.split(",").map(Number);
      urlFilters.priceRange = [min, max];
    }

    if (Object.keys(urlFilters).length > 0) {
      dispatch(updateFilters(urlFilters));
    }
  }, [dispatch, searchParams]);

  // Updates URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.searchKeyword) {
      params.set("search", filters.searchKeyword);
    }

    if (filters.selectedPricing.length > 0) {
      params.set("pricing", filters.selectedPricing.join(","));
    }

    if (filters.sortBy !== "name") {
      params.set("sort", filters.sortBy);
    }

    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 999) {
      params.set(
        "priceRange",
        `${filters.priceRange[0]},${filters.priceRange[1]}`
      );
    }

    setSearchParams(params);
  }, [filters, setSearchParams]);
};
