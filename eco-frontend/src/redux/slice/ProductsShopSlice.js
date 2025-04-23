import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_API = 'http://localhost:3000/api/v1/products';

// Fetch Products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get(`${URL_API}`);
  return res.data.data;
});

// Add Product
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
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Remove Product
export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${URL_API}/${id}`, {
        withCredentials: true
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Edit Product
export const editeProduct = createAsyncThunk(
  'products/editeProduct',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      console.log('Data received in thunk:', updatedData);
      
      // If updatedData is FormData, log its contents
      if (updatedData instanceof FormData) {
        console.log('FormData contents:');
        for (let [key, value] of updatedData.entries()) {
          console.log(key, value);
        }
      }

      const res = await axios.patch(`${URL_API}/${id}`, updatedData, {
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
      // Fetch Products
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
      
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Remove Product
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(item => item._id !== action.payload);
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Edit Product
      .addCase(editeProduct.pending, (state) => {
        state.loading = true;
      })
      
      .addCase(editeProduct.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Updating product in store:', action.payload); // Debug log
        state.products = state.products.map(product => 
            product._id === action.payload.product._id ? action.payload.product : product
        );
    })
    
      .addCase(editeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  }
});

export default ProductShopSlice.reducer;