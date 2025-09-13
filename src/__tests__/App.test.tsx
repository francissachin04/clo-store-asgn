import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../store';

// mocks intersection observer
vi.mock('react-intersection-observer', () => ({
    useInView: () => ({
        ref: vi.fn(),
        inView: false,
    }),
}));

//check if the required elements are rendered
describe('App', () => {
    test('renders main elements', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(screen.getByText(/contents filter/i)).toBeDefined();
        expect(screen.getByText(/contents list/i)).toBeDefined();
    });
});