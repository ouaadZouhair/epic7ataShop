import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_API = 'http://localhost:3000/api/v1/cart';

// Async thunk to fetch cart items
export const fetchFromCart = createAsyncThunk(
    'Cart/fetchFromCart',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(URL_API, { withCredentials: true });
            return data.cart?.products;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch cart");
        }
    }
);

// Async thunk to add an item to the cart
export const addToCart = createAsyncThunk(
    'Cart/addToItem',
    async (item, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(URL_API, item, { withCredentials: true });
            return data.cart.products; // Return the updated cart products
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add item");
        }
    }
);

// Async thunk to remove an item from the cart
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ id, color, size }, { rejectWithValue }) => {
        try {
            await axios.delete(`${URL_API}/product/${id}`, {
                params: { color, size },
                withCredentials: true,
            });
            // Return the identifier to remove from local state
            return { id, color, size };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove item");
        }
    }
);

export const updateCartQuantity = createAsyncThunk('Cart/updateCartQuantity', async ({ productId, quantity }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${URL_API}/product/${productId}`, { quantity }, { withCredentials: true });
        console.log(response.data.cart.products);
        return response.data.cart.products;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update cart item");
    }
});

export const resetCart = createAsyncThunk('Cart/rest', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${URL_API}/reset`, { withCredentials: true });
        return response.data.cart.products;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to reset cart");
    }
})

// Define the initial state
const initialState = {
    cart: [],
    loading: false,
    error: null,
};

// Create the slice
const CartShippingSlice = createSlice({
    name: "CartShipping",
    initialState,

    reducers: {
        // Add or update an item in the cart (local state)
        setItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.cart.find(
                i => i.product._id === item.product._id && i.color === item.color && i.size === item.size
            );

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.cart.push(item);
            }
        },

        // Clear Shipping cart
        clearCart: (state) => {
            state.cart = [];
        }

    },

    // Handle async thunk actions
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload; // Update the cart with fetched products
            })
            .addCase(fetchFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add item to cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload; // Update the cart with the new product list
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove item from cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                const { id, color, size } = action.payload;

                // Filter out the removed item from the cart
                state.cart = state.cart.filter(item =>
                    !(item.product._id === id &&
                        item.product.color === color &&
                        item.product.size === size)
                );
            })

            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update cart item quantity
            .addCase(updateCartQuantity.pending, (state) => {
                state.loading = true;
            })

            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })

            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // rest cart
            .addCase(resetCart.pending, (state) => {
                state.loading = true;
            })

            .addCase(resetCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })

            .addCase(resetCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

// Export actions and reducer
export const { setItem, removeItem, clearCart } = CartShippingSlice.actions;
export default CartShippingSlice.reducer;