import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_API = 'http://localhost:3000/api/v1/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get(`${URL_API}`)
  return res.data
})

// In your ProductsShopSlice.js
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL_API}`, productData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const ProductShopSlice = createSlice({
  name: 'ProductShop',
  initialState: {
    products: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Handle fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handel send products
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      });
  }
});

export default ProductShopSlice.reducer;