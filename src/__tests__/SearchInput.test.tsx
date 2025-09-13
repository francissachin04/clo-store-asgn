import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import storeReducer from '../store/slices/storeSlice';
import SearchInput from '../components/SearchInput';

const renderWithProviders = (component: React.ReactElement) => {
    const store = configureStore({
        reducer: { store: storeReducer },
    });
    return render(
        <Provider store={store}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Provider>
    );
};

describe('SearchInput', () => {
    test('renders search input', () => {
        renderWithProviders(<SearchInput />);

        const searchInput = screen.getByPlaceholderText(/find the items/i);
        expect(searchInput).toBeInTheDocument();
    });

    test('can type in search input', async () => {
        renderWithProviders(<SearchInput />);

        const searchInput = screen.getByPlaceholderText(/find the items/i);

        fireEvent.change(searchInput, { target: { value: 'jacket' } });

        expect(searchInput).toHaveValue('jacket');
    });
});