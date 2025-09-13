import React from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useAppSelector } from '../hooks/reduxHooks';
import SkeletonLoader from './SkeletonLoader';
import ProductCard from './ProductCard';

const ContentsList: React.FC = () => {
  const { displayedItems, isLoading, hasMoreItems } = useAppSelector(state => state.store);
  const { ref } = useInfiniteScroll();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {hasMoreItems && (
        <div ref={ref} className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SkeletonLoader />
          </div>
        </div>
      )}

      {isLoading && displayedItems.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonLoader count={12} />
        </div>
      )}

      {!isLoading && displayedItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ContentsList;