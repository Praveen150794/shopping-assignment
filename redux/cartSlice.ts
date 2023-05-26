import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CartSlice {
  items: { [productId: string]: number };
}

const initialState: CartSlice = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.items[id] > 1) {
        state.items[id]--;
      } else {
        delete state.items[id];
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;


export const getNumItems = (state: RootState) => {
  let numItems = 0;
  for (let id in state.cartSlice.items) {
    numItems += state.cartSlice.items[id];
  }
  return numItems;
};
