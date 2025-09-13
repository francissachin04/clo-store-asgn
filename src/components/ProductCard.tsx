import React from 'react';
import { PricingOption, StoreItem } from '../types';

interface ProductCardProps {
    item: StoreItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const getPricingDisplay = () => {
        switch (item.pricingOption) {
            case PricingOption.PAID:
                return `$${item.price.toFixed(2)}`;
            case PricingOption.FREE:
                return 'FREE';
            case PricingOption.VIEW_ONLY:
                return 'View Only';
            default:
                return '';
        }
    };

    return (
        <div className="rounded-lg overflow-hidden cursor-pointer group">
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div className="flex justify-between items-center py-2 px-2">
                <div className="text-white">
                    <p className="text-sm text-gray-300">{item.creator}</p>
                    <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                </div>
                <div>
                    <p className="font-bold text-lg">{getPricingDisplay()}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
