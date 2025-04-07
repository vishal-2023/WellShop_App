// productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchSingleProduct } from './ProductService';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsState {
  products: Product[];
  viewProduct:Product | null;
  status: 'true' | 'false';
  error: string | null;
}

// Initial state
const initialState: ProductsState = {
  products: [],
  viewProduct:null,
  status: 'false',
  error: null,
};

// Async thunk to fetch products
export const getAllProducts = createAsyncThunk('products/fetchAll', async (filter:string) => {
  const products = await fetchProducts(filter);
  return products;
});

export const getSingleProduct = createAsyncThunk('product/get',async(id:string) => {
  const products = await fetchSingleProduct(id);
  return products;
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = 'true';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = 'false';
        state.products = action.payload; // Store fetched products
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = 'false';
        state.error = action.error.message || 'Failed to load products';
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.status = 'true';
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = 'false';
        state.viewProduct = action.payload; // Store fetched products
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = 'false';
        state.error = action.error.message || 'Failed to load products';
      });
  },
});

export default productsSlice.reducer;
