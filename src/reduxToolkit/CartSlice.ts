import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductInCart, getAllCartItem } from "./ProductService";


interface cartState {
    cart: [],
    status: true | false,
    cartStatus: true |false,
    error: null | string
    AllCartItem:[],
    address:[]
}

const initialState: cartState = {
    cart: [],
    AllCartItem:[],
    status: false,
    cartStatus:false,
    error: null,
    address:[]
};

export const AddCartItem = createAsyncThunk('cart/add', async (data: any) => {
    const products = await addProductInCart(data);
    console.log("ppppp",products)
    return products;
})


export const GetAllCartItem = createAsyncThunk('cart/get', async () => {
    const cartItem = await getAllCartItem();
    return cartItem;
})



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        shippingAddress(state,action){
            state.address = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddCartItem.pending, (state) => {
                state.status = true
            })
            .addCase(AddCartItem.fulfilled, (state, action) => {
                state.status = false;
                state.cart = action.payload
            })
            .addCase(AddCartItem.rejected, (state, action) => {
                console.log("acc",action)
                state.status = false;
                state.error = action.error.message || 'Failed to add cart products';
            })
            .addCase(GetAllCartItem.pending, (state) => {
                state.cartStatus = true
            })
            .addCase(GetAllCartItem.fulfilled, (state, action) => {
                state.cartStatus = false;
                state.AllCartItem = action.payload
            })
            .addCase(GetAllCartItem.rejected, (state, action) => {
                // console.log("acc",action)
                state.cartStatus = false;
                state.error = action.error.message || 'Failed to get cart';
            })
    }
})

export const {shippingAddress} = cartSlice.actions

export default cartSlice.reducer;
