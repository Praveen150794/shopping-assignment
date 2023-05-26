import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartView from './CartView';

// Mocked dependencies
jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
}));
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    TypedUseSelectorHook: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));
jest.mock('../../redux/cartSlice', () => ({
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
}));
jest.mock('../../redux/productsSlice', () => ({
    products: jest.fn(),
}));
jest.mock('../products/ProductCard', () => 'ProductCard');

// Mocked data
const mockProducts = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
];
const mockCartItems = {
    1: 2, // Product 1 with quantity 2
};

describe('CartView', () => {
    const mockStore = configureStore([]);
    let store: any;

    beforeEach(() => {
        store = mockStore({
            productsSlice: { products: mockProducts },
            cartSlice: { items: mockCartItems },
        });
    });

    it('renders correctly', () => {
        const { getByText, getAllByText } = render(
            <Provider store={store}>
                <CartView />
            </Provider>
        );

        // Check for the title and subtitle
        expect(getByText('My Cart')).toBeTruthy();
    });



    it('navigates back when pressing the back button', () => {
        const goBackMock = jest.fn();
        const useNavigationMock = jest
            .spyOn(require('@react-navigation/native'), 'useNavigation')
            .mockReturnValue({ goBack: goBackMock });

        const { getByTestId } = render(
            <Provider store={store}>
                <CartView />
            </Provider>
        );

        // Find the back button and simulate pressing it
        const backButton = getByTestId('back-button');
        fireEvent.press(backButton);

        expect(useNavigationMock).toHaveBeenCalled();
        expect(goBackMock).toHaveBeenCalled();
    });
});
