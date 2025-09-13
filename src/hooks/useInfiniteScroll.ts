import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { loadMoreItems } from "../store/slices/storeSlice";

export const useInfiniteScroll = () => {
  const dispatch = useAppDispatch();
  const { hasMoreItems, isLoading } = useAppSelector((state) => state.store);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasMoreItems && !isLoading) {
      dispatch(loadMoreItems());
    }
  }, [inView, hasMoreItems, isLoading, dispatch]);

  return { ref };
};
