import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    cartItems: [],
  },
};

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialState.cart.cartItems = JSON.parse(localStorage.getItem("cart"));
  } else {
    initialState.cart.cartItems = [];
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      // Modify the state to add the item to the cart
      // For example, assuming the payload is an item to be added to the cart:
      state.cart.cartItems = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
