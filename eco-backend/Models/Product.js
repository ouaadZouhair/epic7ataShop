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

    colors: {
        type: [String],
        required: true,
        enum: ["black", "white", "red", "blue", "orange", "green", 'purple', 'pink'],
        default: [],
    },

    sizes: {
        type: [String],
        required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL', '2XL', 'STD'],
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
        
    },

    ratingAvg:{
        type:Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },

    ratingCount:{
        type: Number,
        required: true,
        default: 0,
    },

    tags:{
        type: [String],
        // required: true,
        default: []
    }

}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema)

export default Product