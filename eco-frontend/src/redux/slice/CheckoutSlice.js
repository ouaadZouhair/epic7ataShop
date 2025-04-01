import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrder = createAsyncThunk('checkout/fetchOrder', async () => {
    const response = await axios.get('http://localhost:3000/api/v1/orders', { withCredentials: true });
    console.log(response.data);
    return response.data;
});

export const createOrder = createAsyncThunk('checkout/createOrder', async (order) => {
    const response = await axios.post('http://localhost:3000/api/v1/orders', order, { withCredentials: true });
    console.log(response.data);
    return response.data;
});

const initialState = {
    order: [],
    loading: false,
    error: null
}

export const CheckoutSlice = createSlice({
    name: 'checkout',
    initialState,

    reducers: {
        resetOrder: (state) => {
            state.order = {};
        }
    },

    extraReducers: (builder) => {
        builder

        // fetching Order
        .addCase(fetchOrder.pending, (state) => {
            state.loading = true;
        })

        .addCase(fetchOrder.fulfilled, (state, action) => {
            state.loading = flase;
            state.order = action.payload;
        })

        .addCase(fetchOrder.rejected, (state, action) => {
            state.loading = flase;
            state.error = action.error.message;
        })

        // creating Order
        .addCase(createOrder.pending, (state) => {
            state.loading = true;
        })

        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = flase;
            state.order = action.payload;
        })

        .addCase(createOrder.rejected, (state, action) => {
            state.loading = flase;
            state.error = action.error;
        })
    }
    
});
export const checkoutReducer = CheckoutSlice.reducer;
export default CheckoutSlice.reducer;