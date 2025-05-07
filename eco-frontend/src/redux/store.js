import { configureStore } from "@reduxjs/toolkit";
import CartShippingSlice from "./slice/CartShippingSlice";
import ProductsShopSlice from "./slice/ProductsShopSlice";
import WishlistSlice from "./slice/WishlistSlice";
import CheckoutSlice from "./slice/CheckoutSlice";
import ReviewsSlice from './slice/ReviewsSlice'

const store = configureStore({
    
    reducer:{
        cart: CartShippingSlice,
        shop: ProductsShopSlice,
        wishlist: WishlistSlice,
        order: CheckoutSlice, 
        review: ReviewsSlice
    }
});

export default store;