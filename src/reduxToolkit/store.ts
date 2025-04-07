// store.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './HomeSlice';
import cartReducer from './CartSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart:cartReducer
  },
});

export default store;
export type AppDispatch = typeof store.dispatch; // Define the type for dispatch
export type RootState = ReturnType<typeof store.getState>;