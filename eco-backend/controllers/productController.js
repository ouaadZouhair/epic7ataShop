import Product from '../Models/Product.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).send({ status: 'success', msg: "Get Products successfully", data: products });
    } catch (error) {
        res.status(500).send({ msg: 'Server Error', error: error.message });
    }
}

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ status: 'error', msg: "Product ID is required" });
        }

        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).send({ status: 'error', msg: "Product not found" });
        }

        res.status(201).send({ status: 'success', msg: "Get Product successfully", product });
    } catch (error) {
        res.status(500).send({ msg: 'Server Error', error: error.message });
    }
}
// Create products
export const createProduct = async (req, res) => {
    try {
        // Convert text-based numbers and booleans
        const price = Number(req.body.price);
        const countInStock = Number(req.body.countInStock);
        const isInStock = req.body.isInStock === "true";  // Convert string to boolean
        const isFavPr = req.body.isFavPr === "true";
        const isNewPr = req.body.isNewPr === "true";

        // Handle uploaded files
        const frontMockupFile = req.files?.frontMockups ? req.files.frontMockups[0].filename : null;
        const backMockupFile = req.files?.backMockups ? req.files.backMockups[0].filename : null;

        // Log for debugging
        console.log("Received Data:", req.body);
        console.log("Uploaded Files:", req.files);

        // Create new product
        const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            color: JSON.parse(req.body.color), // Parse JSON array
            size: JSON.parse(req.body.size),
            price: price,
            countInStock: countInStock,
            isInStock: isInStock,
            isFavPr: isFavPr,
            isNewPr: isNewPr,
            category: req.body.category,
            productType: req.body.productType,
            imageUrls: {
                frontMockups: frontMockupFile ? `/uploads/${frontMockupFile}` : null,
                backMockups: backMockupFile ? `/uploads/${backMockupFile}` : null,
            },
        });

        await newProduct.save();
        res.status(201).json({ msg: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};


// Edite products by ID
export const editeProduct = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { id } = req.params;
        const updatedData = req.body

        // Find product by ID and update it with new data
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedProduct) {
            await session.abortTransaction()
            session.endSession()
            return res.status(404).send({ msg: "Product not found" });
        }
        await session.commitTransaction()
        session.endSession()
        res.status(200).json({ msg: "Product updated successfully", product: updatedProduct });

    } catch (error) {
        session.abortTransaction()
        session.endSession()
        res.status(500).send({ msg: error.message })
    }

}

// Delete products by ID
export const deleteProduct = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).send({ msg: 'Product not found' }); // ✅ Added return
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).send({ msg: 'Product deleted successfully', product: deletedProduct });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({ msg: error.message });
    }
};

