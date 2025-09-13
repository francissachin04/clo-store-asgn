import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import storeReducer from '../store/slices/storeSlice';
import FilterPanel from '../components/FilterPanel';

const createTestStore = () => {
    return configureStore({
        reducer: { store: storeReducer },
    });
};

const renderWithProviders = (component: React.ReactElement) => {
    const store = createTestStore();
    return render(
        <Provider store={store}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Provider>
    );
};

describe('FilterPanel', () => {
    test('renders all pricing options', () => {
        renderWithProviders(<FilterPanel />);

        expect(screen.getByLabelText(/paid/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/free/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/view only/i)).toBeInTheDocument();
    });

    test('can check and uncheck pricing options', () => {
        renderWithProviders(<FilterPanel />);

        const paidCheckbox = screen.getByLabelText(/paid/i);

        expect(paidCheckbox).not.toBeChecked();

        fireEvent.click(paidCheckbox);
        expect(paidCheckbox).toBeChecked();
    });

    test('reset button works', () => {
        renderWithProviders(<FilterPanel />);

        const paidCheckbox = screen.getByLabelText(/paid/i);
        fireEvent.click(paidCheckbox);
        expect(paidCheckbox).toBeChecked();

        const resetButton = screen.getByText(/reset/i);
        fireEvent.click(resetButton);

        expect(paidCheckbox).not.toBeChecked();
    });
});