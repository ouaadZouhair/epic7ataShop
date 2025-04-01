import Product from "../Models/Product.js";
import Order from "../Models/Order.js"; 
import Cart from "../Models/Cart.js";

async function createOrderFromCart (userId, orderInfo) {
    try {
        // Find the user's cart
        const cart = await Cart.findOne({user: userId}).populate('products.product');
        if (!cart) {
            throw new Error('Cart not found');
        }

        if (cart.products.length === 0) {
            throw new Error('Cart is empty');
        }

        // Create the order using cart products and additional details
        const order = new Order({
            user: userId,
            products: cart.products.map(product => ({
                product: product.product._id,
                color: product.color,
                size: product.size,
                quantity: product.quantity,
                fullPrice: product.fullPrice
            })),
            totalPrice: cart.totalPrice, 
            deleviryCost: orderInfo.deleviryCost,
            phone: orderInfo.phone,
            address: orderInfo.address,
            city: orderInfo.city,
            status: 'Pending'
        });

        // Save the order
        const savedOrder = await order.save();

        return savedOrder;

    } catch (error) {
        console.error('Error creating order from cart:', error);
        throw error;
    }
}

// Add Order
export const addOrder = async (req, res) => {
    try {
        const { products, phone, address, city, status } = req.body;
        const  userId  = req.user.id

        const phoneRegex = /^(0[67]\d{8})|(\+212[67]\d{8})$/;
        if (!phone || !phoneRegex.test(phone)) {
            return res.status(400).json({ status: "error", message: "Invalid phone number format" });
        }

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ status: "error", message: "Products are required" });
        }

  
        if (!userId) {
            return res.status(401).json({ status: "error", message: "Unauthorized user" });
        }

        let totalPrice = 0;
        let formattedProducts = [];

        // Fetch product prices
        const productIds = products.map(item => item.product);
        const productData = await Product.find({ _id: { $in: productIds } });

        // Create a price map
        const productMap = new Map();
        productData.forEach(product => productMap.set(product._id.toString(), product.price));

        for (const item of products) {
            const { product: productId, quantity } = item;

            if (!quantity || quantity <= 0) {
                return res.status(400).json({ status: "error", message: `Invalid quantity for product: ${productId}` });
            }

            const price = productMap.get(productId);
            if (!price) {
                return res.status(404).json({ status: "error", message: `Product not found: ${productId}` });
            }

            const fullPrice = price * quantity;
            totalPrice += fullPrice;

            formattedProducts.push({
                product: productId,
                quantity,
                fullPrice
            });
        }

        // Create and save the order
        const newOrder = new Order({
            user,
            products: formattedProducts,
            totalPrice,
            phone,
            address,
            city,
            status: status || "Pending"
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            status: "success",
            message: "The order was saved successfully",
            savedOrder
        });

    } catch (error) {
        console.error("Error saving order:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Get All Orders by User
export const getAllOrdersByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId })
            .populate("products.product", "title price") // Ensure Product model has `title` and `price`
            .populate("user", "fullName email") // Fetch user's full name & email
            .select("user products totalPrice status createdAt");

        res.status(200).json({
            status: "success",
            message: "Your orders retrieved successfully",
            data: orders
        });

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: error.message
        });
    }
};

// Cancel Order
export const cancelOrder = async (req, res) => {
    try {
        const userID = req.user.id;
        const orderId = req.params.id;

        const order = await Order.findOne({ _id: orderId, user: userID }); // Fixed query

        if (!order) {
            return res.status(404).json({ status: "failed", message: "Order not found" });
        }

        if (order.status !== "Pending") { // Ensure case matches schema definition
            return res.status(400).json({ status: "failed", message: "Order cannot be canceled" });
        }

        order.status = "Canceled"; // Ensure consistency with schema enum values
        await order.save();

        return res.status(200).json({
            status: "success",
            message: "Order status updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const removeProductFromOrder = async (req, res) => {
    try {
        const userID = req.user.id;
        const orderId = req.params.id;

        const order = await Order.findOneAndDelete({ _id: orderId, user: userID });

        if (!order) {
            return res.status(404).json({ status: "failed", message: "Order not found" });
        }

        return res.status(200).json({
            status: "success",
            message: "Order removed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: error.message
        });
    }
}
