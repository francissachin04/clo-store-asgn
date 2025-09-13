import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
}

const SkeletonLoader: React.FC<LoadingSkeletonProps> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-800"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-800 rounded mb-2"></div>
            <div className="h-3 bg-gray-800 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;