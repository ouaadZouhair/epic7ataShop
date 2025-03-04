import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_API = 'http://localhost:3000/api/v1/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () =>{
  const res = await axios.get(`${URL_API}`)
  return res.data
})

export const sendProducts = createAsyncThunk('products/sendProducts', async (productData) =>{
  const res = await axios.post(`${URL_API}`, productData,
    { withCredentials: true });
  return res.data
})



const ProductShopSlice = createSlice({
    name:'ProductShop',
    initialState: {
        products: [],
        loading: false,
        error: null
    },

    reducers:{},

    extraReducers: (builder) => {
      builder
        // Handle fetch products
        .addCase(fetchProducts.pending, (state) =>{
          state.loading = true;
        })

        .addCase(fetchProducts.fulfilled, (state, action) =>{
          state.loading = false;
          state.products = action.payload;
        })

        .addCase(fetchProducts.rejected, (state,action) =>{
          state.loading = false;
          state.error = action.error.message;
        })

        // Handel send products
        .addCase(sendProducts.pending, (state)=>{
          state.loading = true;
        })

        .addCase(sendProducts.fulfilled, (state, action) =>{
          state.loading = false;
          state.products = action.payload;
        })

        .addCase(sendProducts.rejected, (state, action) =>{
          state.loading = false;
          state.error = action.error.message
        });
    }
});

export default ProductShopSlice.reducer;