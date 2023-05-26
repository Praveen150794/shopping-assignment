import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from './ProductCard';
import { Product } from '../../models/Product';
import { RootState } from '../../redux/store';

// Mocked dependencies
jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
}));

describe('ProductCard', () => {
    const mockStore: any = configureStore([]);
    let store: any;
    const mockProduct: Product = {
        id: '1',
        name: 'Test Product',
        price: 10.99,
        img: 'https://example.com/image.png',
    };

    beforeEach(() => {
        store = mockStore({});
    });

    it('renders correctly with product information', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <ProductCard productData={mockProduct} onAddToCart={jest.fn()} />
            </Provider>
        );

        const productName = getByText('Test Product');
        const productPrice = getByText('$10.99');
        const addToCartButton = getByTestId('add-to-cart-button');

        expect(productName).toBeTruthy();
        expect(productPrice).toBeTruthy();
        expect(addToCartButton).toBeTruthy();
    });

    it('calls the onAddToCart function when "Add to Cart" button is pressed', () => {
        const onAddToCart = jest.fn();
        const { getByTestId } = render(
            <Provider store={store}>
                <ProductCard productData={mockProduct} onAddToCart={onAddToCart} />
            </Provider>
        );

        const addToCartButton = getByTestId('add-to-cart-button');
        fireEvent.press(addToCartButton);

        expect(onAddToCart).toHaveBeenCalledTimes(1);
        expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
    });

    it('calls the onRemoveFromCart function when "-" button is pressed in cart page', () => {
        const onRemoveFromCart = jest.fn();
        const { getByTestId } = render(
            <Provider store={store}>
                <ProductCard
                    productData={mockProduct}
                    onAddToCart={jest.fn()}
                    onRemoveFromCart={onRemoveFromCart}
                    numberOfProduct={2}
                    type="cartPage"
                />
            </Provider>
        );

        const removeButton = getByTestId('remove-button');
        fireEvent.press(removeButton);

        expect(onRemoveFromCart).toHaveBeenCalledTimes(1);
        expect(onRemoveFromCart).toHaveBeenCalledWith(mockProduct);
    });

    it('calls the onAddToCart function when "+" button is pressed in cart page', () => {
        const onAddToCart = jest.fn();
        const { getByTestId } = render(
            <Provider store={store}>
                <ProductCard
                    productData={mockProduct}
                    onAddToCart={onAddToCart}
                    numberOfProduct={2}
                    type="cartPage"
                />
            </Provider>
        );

        const addButton = getByTestId('add-button');
        fireEvent.press(addButton);

        expect(onAddToCart).toHaveBeenCalledTimes(1);
        expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
    });
});
