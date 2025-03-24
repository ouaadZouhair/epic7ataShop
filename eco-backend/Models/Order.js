import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            color: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, required: true },
            fullPrice: { type: Number, required: true }
        }
    ],

    totalPrice: { type: Number, required: true },

    deleviryCost: { type: Number, required: true },

    phone:{ type: String, required: true },

    address:{ type: String, required: true },

    city:{ type: String, required: true },
  
    status: {
        type: String,
        enum: ['Pending', 'Printing', 'Delivering', 'Completed', 'Canceled'],
        default: 'Pending'
    }
}, { timestamps: true })

const Order = mongoose.model("Order", OrderSchema)

export default Order