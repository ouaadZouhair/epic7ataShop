import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_API = 'http://localhost:3000/api/v1/cart';

// Async thunk to fetch cart items
export const fetchFromCart = createAsyncThunk(
    'Cart/fetchFromCart',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(URL_API, { withCredentials: true });
            console.log(data.cart.products); // Debugging: Log the API response
            return data.cart.products; // Ensure this matches your API response structure
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
            console.log(data.cart); // Debugging: Log the API response
            return data.cart.products; // Return the updated cart products
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add item");
        }
    }
);

// Async thunk to remove an item from the cart
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (item, { rejectWithValue }) => {
        const { id, color, size } = item;
        console.log(item)
        try {
            // Send DELETE request with id in URL and color/size in the request body
            await axios.delete(`${URL_API}/product/${id}`, {
                params : { color, size }, // Send data in the request body
                withCredentials: true,
            });
            return { id, color, size }; // Return the removed item's details to update the state
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove item");
        }
    }
);

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

        // Remove an item from the cart (local state)
        removeItem: (state, action) => {
            const { id, color, size } = action.payload;
            state.cart = state.cart.filter(
                item => !(item.product._id === id && item.color === color && item.size === size)
            );
        },

        // Clear the cart (local state)
        clearCart: (state) => {
            state.cart = [];
        },
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
                state.cart = state.cart.filter(
                    (item) =>
                        !(
                            item.product._id === id &&
                            item.color === color &&
                            item.size === size
                        )
                );
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions and reducer
export const { setItem, removeItem, clearCart } = CartShippingSlice.actions;
export default CartShippingSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const URL_API = 'http://localhost:3000/api/v1/cart';

// // Async thunk to fetch cart items
// export const fetchFromCart = createAsyncThunk(
//     'Cart/fetchFromCart',
//     async (_, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.get(URL_API, { withCredentials: true });
//             console.log(data.cart.products); // Debugging: Log the API response
//             return data.cart.products; // Ensure this matches your API response structure
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to fetch cart");
//         }
//     }
// );

// // Async thunk to add an item to the cart
// export const addToCart = createAsyncThunk(
//     'Cart/addToItem',
//     async (item, { rejectWithValue }) => {
//         try {
//             await axios.post(URL_API, item, { withCredentials: true });
//             console.log(item)
//             return item; // Return the added item to update the state
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to add item");
//         }
//     }
// );

// // Async thunk to remove an item from the cart
// export const removeFromCart = createAsyncThunk(
//     'Cart/removeFromCart',
//     async (id, { rejectWithValue }) => {
//         try {
//             await axios.delete(`${URL_API}/product/${id}`, { withCredentials: true });
//             console.log(id)
//             return id; // Return the removed item's ID to update the state
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to remove item");
//         }
//     }
// );

// // Define the initial state
// const initialState = {
//     cart: [],
//     loading: false,
//     error: null,
// };

// // Create the slice
// const CartShippingSlice = createSlice({
//     name: "CartShipping",
//     initialState,

//     reducers: {
//         // Add or update an item in the cart (local state)
//         setItem: (state, action) => {
//             const item = action.payload;
//             const existingItem = state.cart.find(
//                 i => i.id === item.id && i.color === item.color && i.size === item.size
//             );

//             if (existingItem) {
//                 existingItem.quantity += item.quantity;
//             } else {
//                 state.cart.push(item);
//             }
//         },

//         // Remove an item from the cart (local state)
//         removeItem: (state, action) => {
//             const { id, color, size } = action.payload;
//             state.cart = state.cart.filter(
//                 item => !(item.id === id && item.color === color && item.size === size)
//             );
//         },

//         // Clear the cart (local state)
//         clearCart: (state) => {
//             state.cart = [];
//         },
//     },

//     // Handle async thunk actions
//     extraReducers: (builder) => {
//         builder
//             // Fetch cart
//             .addCase(fetchFromCart.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchFromCart.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.cart = action.payload; // Update the cart
//             })
//             .addCase(fetchFromCart.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // Add item to cart
//             .addCase(addToCart.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(addToCart.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const item = action.payload;
//                 const existingItem = state.cart.find(
//                     i => i.id === item.id && i.color === item.color && i.size === item.size
//                 );

//                 if (existingItem) {
//                     existingItem.quantity += item.quantity;
//                 } else {
//                     state.cart.push(item);
//                 }
//             })
//             .addCase(addToCart.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // Remove item from cart
//             // .addCase(removeFromCart.pending, (state) => {
//             //     state.loading = true;
//             //     state.error = null;
//             // })
//             .addCase(removeFromCart.fulfilled, (state, action) => {
//                 state.cart = state.cart.filter(item => item._id !== action.payload);
//             })
//             // .addCase(removeFromCart.rejected, (state, action) => {
//             //     state.loading = false;
//             //     state.error = action.payload;
//             // });
//     },
// });

// // Export actions and reducer
// export const { setItem, removeItem, clearCart } = CartShippingSlice.actions;
// export default CartShippingSlice.reducer;