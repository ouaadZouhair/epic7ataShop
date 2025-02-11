import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'Shipped', 'delivered'],
        default: 'pending'
    }
})

const Order = mongoose.model("Order", OrderSchema)

export default Order