import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrder = createAsyncThunk('checkout/fetchOrder', async () => {
    const response = await axios.get('http://localhost:3000/api/v1/orders', { withCredentials: true });
    return response.data.data;
});

export const fetchAllOrders = createAsyncThunk('checkout/fetchAllOrders', async () => {
    const response = await axios.get(
        'http://localhost:3000/api/v1/orders/admin/all',
        { withCredentials: true }
    );
    return response.data.data;
});

export const createOrder = createAsyncThunk('checkout/createOrder', async (order) => {
    const response = await axios.post('http://localhost:3000/api/v1/orders',
         order, 
         { withCredentials: true });
    return response.data;
});

export const cancelOrder = createAsyncThunk('checkout/cancelOrder', async (order) => {
    const response = await axios.patch(`http://localhost:3000/api/v1/orders/cancel`, order, { withCredentials: true });
    return response.data;
});

export const editOrderStatus = createAsyncThunk('checkout/editOrderStatus', async (order) => {
        const response = await axios.patch(`http://localhost:3000/api/v1/orders/admin/status`,
            order,
            { withCredentials: true }
        );
        return response.data;
    }
);

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

            // fetching an Order
            .addCase(fetchOrder.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })

            .addCase(fetchOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Fetch all orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;

            })

            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })

            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // creating Order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })

            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                // state.order = action.payload;
            })

            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            // editing Order status - client
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
            })

            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                // state.order = action.payload;
            })

            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            // editing Order status - client
            .addCase(editOrderStatus.pending, (state) => {
                state.loading = true;
            })

            .addCase(editOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                // state.order = action.payload;
            })

            .addCase(editOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

    }

});
export const checkoutReducer = CheckoutSlice.reducer;
export default CheckoutSlice.reducer;