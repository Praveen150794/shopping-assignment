import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ProductsView } from './Products';
import { addToCart } from '../../redux/cartSlice';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';

jest.mock('axios');
jest.mock('@expo/vector-icons', () => {
    const { View } = require('react-native');
    return {
        Ionicons: View, // You can replace `View` with any other mock component or implementation
    };
});

describe('ProductsView', () => {
    const mockStore = configureStore([]);
    let store: any;
    let mockDispatch: any;

    beforeEach(() => {
        store = mockStore({
            productsSlice: {
                products: [{ id: "1", name: 'Product 1', price: 10 }]
            }, // Mocked initial state for productsSlice
            cartSlice: { items: {} }
        });
        mockDispatch = jest.fn();
        store.dispatch = mockDispatch;
    });

    it('renders products and navigates to cart screen when "Navigate to Cart" is pressed', async () => {
        const mockedProducts = [
            { id: "1", name: 'Product 1', price: 10 },
            { id: "2", name: 'Product 2', price: 20 },
        ];

        const axiosGetMock = jest.spyOn(axios, 'get');
        axiosGetMock.mockImplementation(() =>
            Promise.resolve({ data: mockedProducts })
        );

        const navigateToCartMock = jest.fn();
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <ProductsView onNavigateToCart={navigateToCartMock} />
            </Provider>
        );

        // Wait for the data to be fetched
        await waitFor(() => expect(axios.get).toHaveBeenCalled());

        expect(getByText('Product 1')).toBeDefined();

        // Simulate adding a product to the cart
        const addToCartButton = getByTestId('add-to-cart-button');

        fireEvent.press(addToCartButton);

        // Check if the addToCart action is dispatched
        expect(mockDispatch).toHaveBeenCalledWith(addToCart("1")); // Assuming product 1 has an ID of 1

        // Simulate pressing the "Navigate to Cart" button
        const navigateToCartButton = getByTestId('navigate-to-cart-button');
        fireEvent.press(navigateToCartButton);

        // Check if the navigate function is called with the correct screen name
        expect(navigateToCartMock).toHaveBeenCalled();

        // Restore the original implementation of axios.get
        axiosGetMock.mockRestore();
    });
});
