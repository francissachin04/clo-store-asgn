import { render, screen } from '@testing-library/react';
import { PricingOption } from '../types';
import ProductCard from '../components/ProductCard';

const mockItem = {
    id: 'test-1',
    creator: 'Test Creator',
    title: 'Test Item',
    pricingOption: PricingOption.PAID,
    imagePath: '',
    price: 25
};

describe('ProductCard', () => {
    test('displays item information correctly', () => {
        render(<ProductCard item={mockItem} />);

        expect(screen.getByText('Test Creator')).toBeInTheDocument();
        expect(screen.getByText('Test Item')).toBeInTheDocument();
        expect(screen.getByText('$25.00')).toBeInTheDocument();
    });

    test('shows FREE for free items', () => {
        const freeItem = { ...mockItem, pricingOption: PricingOption.FREE };
        render(<ProductCard item={freeItem} />);

        expect(screen.getByText('FREE')).toBeInTheDocument();
    });

    test('shows View Only for view only items', () => {
        const viewOnlyItem = { ...mockItem, pricingOption: PricingOption.VIEW_ONLY };
        render(<ProductCard item={viewOnlyItem} />);

        expect(screen.getByText('View Only')).toBeInTheDocument();
    });
});
