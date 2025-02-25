import { createSlice } from "@reduxjs/toolkit";

const CartShippingSlice = createSlice({
    name: "CartShipping",
    initialState: {
        items: [],
    },

    reducers:{
        addItem: (state, action) => {
            const item = action.payload;
            const existtingItem = state.items.find(i => i.id === item.id && i.color === item.color && i.size === item.size);

            if(existtingItem){
                existtingItem.quantity += item.quantity;
            } else {
                state.items.push(item)
            }
        },

        removeItem: (state, action) => {
            const {id, color, size} = action.payload;
            state.items = state.items.filter(item => !(item.id === id && item.color === color && item.size === size));
        },

        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const {addItem, removeItem, clearCart} = CartShippingSlice.actions;
export default CartShippingSlice.reducer;