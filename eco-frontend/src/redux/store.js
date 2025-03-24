import { configureStore } from "@reduxjs/toolkit";
import CartShippingSlice from "./slice/CartShippingSlice";
import ProductsShopSlice from "./slice/ProductsShopSlice";
import  WishlistSlice from "./slice/WishlistSlice";

const store = configureStore({
    
    reducer:{
        cart: CartShippingSlice,
        shop: ProductsShopSlice,
        wishlist: WishlistSlice,
    }
});

export default store;