import Product from "../Models/Product.js";
import Wishlist from "../Models/Wishlist.js";
import mongoose from "mongoose";


export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await Wishlist.findOne({ user: userId }).populate("products", "title price category").select("-createdAt -updatedAt");

        if (!wishlist) return res.status(200).send({ status: 'sucess', msg: "Wishlist is empty" });

        res.status(200).send({ status: 'success', msg: "Wishlist imported successfully", data: wishlist });
    } catch (e) {
        res.status(500).send({ status: "Failed", msg: "server failed" })
    }
}

export const addProductToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({status:"Failed", msg: "Product not found" });

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [productId] });
        } else {
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({status:"success", msg: "Product already in wishlist" });
            }
            wishlist.products.push(productId);
        }

        await wishlist.save();
        res.status(201).json({status:"success", msg: "Product added to wishlist", wishlist });
    } catch (error) {
        res.status(500).json({status:"Failed", msg: "Error adding product to wishlist", error });
    }
}

export const removeProductFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ status: "Failed", msg: "Invalid product ID", data:productId });
        }

        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ status: "Failed", msg: "Wishlist not found" });
        }

        // Use $pull to remove product from wishlist
        const updatedWishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } },
            { new: true } // Return updated wishlist
        );

        res.status(200).json({ status: "success", msg: "Product removed from wishlist", data: updatedWishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed", msg: "Error removing product from wishlist", error });
    }
};