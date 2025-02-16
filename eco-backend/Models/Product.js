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

    // color:{
    //     type: String,
    //     required: true,
    //     enum: ['white', 'black', 'blue', 'red', 'green'],
    //     default: 'white',
    // },

    price: {
        type: Number,
        required: true,
    },

    imageUrls: {
        frontMockups : {type:String},
        backMockups : {type:String}
    },

    countInStock: {
        type: Number,
        required: true,
    },

    IsInStock: {
        type: Boolean,
        required: true
    },


    category:{
        type: String,
        required: true,
    }



}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema)

export default Product