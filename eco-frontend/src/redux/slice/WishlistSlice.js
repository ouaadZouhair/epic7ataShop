import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";



const URL_API = 'http://localhost:3000/api/v1/wishlist';


// Fetch Wishlist
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(URL_API, { withCredentials: true });
        console.log(res.data.wishlist.products)
        return res.data.wishlist.products;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
    }
});
 
export const storeWishlist = createAsyncThunk('wishlist/storeWishlist', async (WishlistData, { rejectWithValue }) => {
    try {
        const res = await axios.post(URL_API, WishlistData, { withCredentials: true });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add item to wishlist');
    }
});

export const deleteWishlist = createAsyncThunk('wishlist/deleteWishlist', async (id, { rejectWithValue }) =>{
    try {
        const res = await axios.delete(`${URL_API}/${id}`, { withCredentials: true })
        return id
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to delete from wishlist')
    }
})


const WishlistSlice = createSlice({
    name: 'WishlistUser',
    initialState: {
        wishlist: [],
        loading: false,
        error: null
    },

    reducers: {
        addItemToWishlist: (state, action) => {

            const item = action.payload;
            const existingItem = state.wishlist.find(i => i.id === item._id);
        
            if (!existingItem) {
                state.wishlist = [...state.wishlist, item];
            }else {
                console.log('Aready existing')
            }
        },
        

        removeItemFromWishlist: (state, action) => {
            const { id } = action.payload;
            state.wishlist = state.wishlist.filter(item => item._id !== id)
        }
    },

    extraReducers: (builder) => {
        builder

        // handle fetsh wishlist
        .addCase(fetchWishlist.pending, (state) =>{
            state.loading = true;
        })

        .addCase(fetchWishlist.fulfilled, (state, action) =>{
            state.loading = false;
            state.wishlist = action.payload;
        })

        .addCase(fetchWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })


        // handel send wishlist 
        .addCase(storeWishlist.pending, (state)=>{
            state.loading = true;
        })

        .addCase(storeWishlist.fulfilled, (state, action) =>{
            state.loading = false;
            // state.wishlist = [...state.wishlist, action.payload]
        })

        .addCase(storeWishlist.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message
        })

        // handel delete wishlist

        .addCase(deleteWishlist.pending, (state) =>{
            state.loading = true;
        })

        .addCase(deleteWishlist.fulfilled, (state, action) => {
            state.loading = false;
            const deletedId = action.meta.arg; // This is the ID we sent
            state.wishlist = state.wishlist.filter(item => item._id !== deletedId);
        })

        .addCase(deleteWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export const { addItemToWishlist, removeItemFromWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;