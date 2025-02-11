import mongoose from "mongoose";
import User from "./User";

const WishlistSchema = new mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        }
    ],
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

export default Wishlist;