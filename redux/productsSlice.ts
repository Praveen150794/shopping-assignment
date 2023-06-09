import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../models/Product";

export interface ProductSlice {
  products: Product[];
}

const initialState: ProductSlice = {
  products: [],
};

const productSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      products.forEach((product) => {
        const existingProduct = state.products.find((p) => p.id === product.id);
        if (existingProduct) {
          existingProduct.name = product.name;
          existingProduct.price = product.price;
        } else {
          state.products.push(product);
        }
      });
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
