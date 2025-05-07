import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const URL_API = 'http://localhost:3000/api/v1/rating';

export const fetchReviews = createAsyncThunk('review/fetchReviews', async(productId, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${URL_API}/${productId}`, { withCredentials: true });
        return res.data.ratings
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch reviews");
    }
})

export const addReviews = createAsyncThunk('review/addReviews', async ({productId, reviewData}, { rejectWithValue}) => {
    try {
        const res = await axios.post(`${URL_API}/${productId}`, reviewData, { withCredentials: true });
        console.log(res)
        return res.data.rating
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add review");
    }
})

const ReviewSlice = createSlice({
    name: 'Review',
    initialState:{
        review: [],
        loading: false,
        error: null
    },

    extraReducers: (builder) =>{
        builder
        .addCase(fetchReviews.pending, (state) =>{
            state.loading = true
            state.error = null
        })

        .addCase(fetchReviews.fulfilled, (state, action) =>{
            state.loading = false
            state.review = action.payload
        })

        .addCase(fetchReviews.rejected, (state, action) =>{
            state.loading = false
            state.error = action.error.message
        })

        .addCase(addReviews.pending, (state)=>{
            state.loading = true
        })

        .addCase(addReviews.fulfilled, (state, action) => {
            state.loading = false
            state.review.push(action.payload)
        })

        .addCase(addReviews.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default ReviewSlice.reducer