import Product from '../Models/Product.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create products
export const createProduct = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { title, price, description, countInStock, category } = req.body;

        const imageUrls = {
            frontMockups: req.files?.frontMockups ? `/uploads/${req.files.frontMockups[0].filename}` : '',
            backMockups: req.files?.backMockups ? `/uploads/${req.files.backMockups[0].filename}` : ''
        };

        const newProduct = new Product({
            title,
            price,
            description,
            countInStock,
            category,
            imageUrls
        });

        await newProduct.save({ session });
        await session.commitTransaction();

        res.status(201).send({ status: 'success', msg: "Product registered successfully", data: newProduct });
    } catch (e) {
        await session.abortTransaction();

        // Safely delete uploaded files if an error occurs
        if (req.files?.frontMockups) {
            const frontPath = path.join(__dirname, "../uploads", req.files.frontMockups[0].filename);
            fs.unlinkSync(frontPath);
        }

        if (req.files?.backMockups) {
            const backPath = path.join(__dirname, "../uploads", req.files.backMockups[0].filename);
            fs.unlinkSync(backPath);
        }

        console.error('Error creating product:', e);
        res.status(500).send({ msg: e.message, error: e.message });
    } finally {
        session.endSession();
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
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { id } = req.params;

        // Find product by Id and delete it
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            await session.abortTransaction()
            session.endSession()
            res.status(404).send({ msg: 'product not found' })
        }

        await session.commitTransaction()
        session.endSession()

        res.status(200).send({ msg: 'Product deleted successfully', data: deletedProduct })


    } catch (error) {
        res.status(500).send({ msg: error.message })
        session.abortTransaction()
    }
}