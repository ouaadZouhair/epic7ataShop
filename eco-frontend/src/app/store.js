import { configureStore } from "@reduxjs/toolkit";
import CartShippingSlice from "../slice/CartShippingSlice";
import ProductsShopSlice from "../slice/ProductsShopSlice"

const store = configureStore({
    reducer:{
        cart: CartShippingSlice,
        shop: ProductsShopSlice,
    }
});

export default store;