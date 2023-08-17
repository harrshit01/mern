import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  fetchItemsByUserId,
  resetCart,
  updateCart,
} from "./cartAPI";
const initialState = {
  items: [],
  status: "idle",
  cartLoaded: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const data = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    const data = await fetchItemsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (updatedItem) => {
    const data = await updateCart(updatedItem);
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (itemId) => {
    const data = await deleteCartItem(itemId);
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
