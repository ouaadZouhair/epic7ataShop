import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    color: {
        type: [String],
        required: true,
        enum: ["bg-black", "bg-white", "bg-red-500", "bg-blue-500", "bg-orange-500", "bg-green-700"],
        default: [],
    },

    size: {
        type: [String],
        required: true,
        enum: ['S', 'M', 'L', 'XL', '2XL'],
        default: []
    },

    price: {
        type: Number,
        required: true,
    },

    imageUrls: {
        frontMockups: {
            type: String,
            required: true
            
        },
        backMockups: {
            type: String,
            required: true
        }
    },

    countInStock: {
        type: Number,
        required: true,
    },

    isInStock: {
        type: Boolean,
        required: true
    },

    isFavPr: {
        type: Boolean,
        required: true,
    },

    isNewPr:{
        type: Boolean,
        required: true
    },

    category: {
        type: String,
        required: true,
    },

    productType:{
        type: String,
        required: true,
    }



}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema)

export default Product