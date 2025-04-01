import mongoose from "mongoose";    

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            color: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, required: true },
            fullPrice: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema)

export default Cart