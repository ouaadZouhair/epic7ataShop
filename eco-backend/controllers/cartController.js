import mongoose from 'mongoose';
import Cart from '../Models/Cart.js';
import Product from '../Models/Product.js';

// Get cart for the user
export const getFromCart = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).send({ status: 'Failed', msg: 'User ID is required' });
        }

        const cart = await Cart.findOne({ user: userId })
            .populate("products.product", "title price imageUrls") // Populate the product field
            .select("-createdAt -updatedAt");

        if (!cart) {
            return res.status(200).send({ status: 'Success', msg: "Cart is empty", cart: { products: [] } });
        }

        // Transform the response to match the desired structure
        const transformedCart = {
            ...cart.toObject(),
            products: cart.products.map(item => ({
                // ...item.toObject(),
                product: {
                    ...item.product.toObject(),
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                    fullPrice: item.fullPrice
                }
            }))
        };

        res.status(200).send({ status: 'Success', msg: "Cart retrieved successfully", cart: transformedCart });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send({ status: 'Failed', msg: 'Server error' });
    }
};

// Add product to cart
export const addtoCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, color, size, quantity } = req.body;

        // Validate input
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ status: 'Failed', msg: 'Invalid product ID' });
        }

        if (!quantity || quantity <= 0) {
            return res.status(400).send({ status: 'Failed', msg: 'Quantity must be a positive number' });
        }

        if (!color || !size) {
            return res.status(400).send({ status: 'Failed', msg: 'Color and size are required' });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ status: 'Failed', msg: 'Product not found' });
        }

        // Calculate fullPrice for the product
        const fullPrice = product.price * quantity;

        // Find or create the cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({
                user: userId,
                products: [{ product: productId, color, size, quantity, fullPrice }],
                totalPrice: fullPrice, // Initialize totalPrice
            });
        } else {
            // Check if the product already exists in the cart with the same color and size
            const index = cart.products.findIndex(
                (p) => p.product.toString() === productId && p.color === color && p.size === size
            );

            if (index !== -1) {
                // Update quantity and fullPrice if the product already exists
                cart.products[index].quantity += quantity;
                cart.products[index].fullPrice = product.price * cart.products[index].quantity;
            } else {
                // Add new product to the cart
                cart.products.push({ product: productId, color, size, quantity, fullPrice });
            }

            // Recalculate totalPrice
            cart.totalPrice = cart.products.reduce((total, item) => total + item.fullPrice, 0);
        }

        // Save the cart
        await cart.save();

        // Populate product details before sending the response
        const populatedCart = await Cart.findById(cart._id)
            .populate("products.product", "title price imageUrls");

        // Transform the response to match the desired structure
        const transformedCart = {
            ...populatedCart.toObject(),
            products: populatedCart.products.map(item => ({
                // ...item.toObject(),
                product: {
                    ...item.product.toObject(),
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                    fullPrice: item.fullPrice
                }
            }))
        };

        res.status(200).send({ status: 'Success', msg: 'Product added to cart', cart: transformedCart });
    } catch (err) {
        console.error("Error in addtoCart:", err); // Log the error for debugging
        res.status(500).send({ status: 'Failed', msg: 'Server error' });
    }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const {color, size} = req.query

        // Validate input
        if (!userId) {
            return res.status(400).send({ status: 'Failed', msg: 'User ID is required' });
        }

        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ status: 'Failed', msg: 'Invalid product ID' });
        }

        // Find the cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send({ status: 'Failed', msg: 'Cart not found' });
        }

        // Check if the product exists in the cart
        const productIndex = cart.products.findIndex(
            (p) =>
                p.product.toString() === productId &&
                p.color === color &&
                p.size === size
        );

        if (productIndex === -1) {
            return res.status(404).send({ status: 'Failed', msg: 'Product not found in cart' });
        }

        // Get the fullPrice of the product being removed
        const removedProduct = cart.products[productIndex];
        const removedProductPrice = removedProduct.fullPrice;

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Recalculate the totalPrice
        cart.totalPrice = cart.products.reduce((total, item) => total + item.fullPrice, 0);

        // Save the updated cart
        await cart.save();

        // Populate product details before sending the response
        const populatedCart = await Cart.findById(cart._id)
            .populate("products.product", "title price imageUrls");

        // Transform the response to match the desired structure
        const transformedCart = {
            ...populatedCart.toObject(),
            products: populatedCart.products.map(item => ({
                product: {
                    ...item.product.toObject(),
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                    fullPrice: item.fullPrice
                }
            }))
        };

        res.status(200).send({ status: 'Success', msg: 'Product removed from cart', updatedCart: transformedCart });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send({ status: 'Failed', msg: 'Server error' });
    }
};

// Update product in cart
export const updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { color, size, quantity } = req.body;

        // Validate input
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ status: 'Failed', msg: 'Invalid product ID' });
        }

        if (!quantity || quantity <= 0) {
            return res.status(400).send({ status: 'Failed', msg: 'Quantity must be a positive number' });
        }

        if (!color || !size) {
            return res.status(400).send({ status: 'Failed', msg: 'Color and size are required' });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ status: 'Failed', msg: 'Product not found' });
        }

        // Find the cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send({ status: 'Failed', msg: 'Cart not found' });
        }

        // Check if the product exists in the cart
        const productIndex = cart.products.findIndex(
            (p) => p.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).send({ status: 'Failed', msg: 'Product not found in cart' });
        }

        // Update quantity and fullPrice
        cart.products[productIndex].quantity = quantity;
        cart.products[productIndex].fullPrice = product.price * quantity;

        // Recalculate the totalPrice
        cart.totalPrice = cart.products.reduce((total, item) => total + item.fullPrice, 0);

        // Save the updated cart
        await cart.save();

        // Populate product details before sending the response
        const populatedCart = await Cart.findById(cart._id)
            .populate("products.product", "title price imageUrls");

        // Transform the response to match the desired structure
        const transformedCart = {
            ...populatedCart.toObject(),
            products: populatedCart.products.map(item => ({
               
                product: {
                    ...item.product.toObject(),
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                    fullPrice: item.fullPrice
                }
            }))
        };

        res.status(200).send({ status: 'Success', msg: 'Cart updated successfully', cart: transformedCart });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send({ status: 'Failed', msg: 'Server error' });
    }
};

// Reset cart
export const resetCart = async (req, res) => {
    try {
        const userId = req.user.id;

        // Validate user ID
        if (!userId) {
            return res.status(400).send({ status: 'Failed', msg: 'User ID is required' });
        }

        // Find the cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send({ status: 'Failed', msg: 'Cart not found' });
        }

        // Clear all products from the cart
        cart.products = []; // Reset the products array
        cart.totalPrice = 0;
        await cart.save(); // Save the updated cart

        // Send success response
        res.status(200).send({ status: 'Success', msg: 'Cart reset successfully', cart });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send({ status: 'Failed', msg: 'Server error' });
    }
};