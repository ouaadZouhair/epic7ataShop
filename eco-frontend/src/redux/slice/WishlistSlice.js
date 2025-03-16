import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const URL_API = 'http://localhost:3000/api/v1/wishlist';

// Fetch Wishlist from Backend
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(URL_API, { withCredentials: true });
        console.log(data.wishlist.products)
        return data.wishlist.products;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch wishlist");
    }
});

// Add Item to Wishlist in Backend
export const addToWishlist = createAsyncThunk("wishlist/addToWishlist", async (item, { rejectWithValue }) => {
    try {
        await axios.post(URL_API, item, { withCredentials: true });
        return item;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add item");
    }
});

// Remove Item from Wishlist in Backend
export const removeFromWishlist = createAsyncThunk("wishlist/removeFromWishlist", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${URL_API}/${id}`, { withCredentials: true });
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to remove item");
    }
});

const WishlistSlice = createSlice({
    name: 'WishlistUser',
    initialState: {
        wishlist: [],
        loading: false,
        error: null
    },
    reducers: {
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                if (!state.wishlist.some(i => i._id === action.payload._id)) {
                    state.wishlist.push(action.payload);
                }
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
            });
    }
});

export const { setWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
