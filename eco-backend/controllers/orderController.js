import Product from "../Models/Product.js";
import Order from "../Models/Order.js"; 

// Add Order
export const addOrder = async (req, res) => {
    try {
        const { products, phone, address, status } = req.body;

        const phoneRegex = /^(0[67]\d{8})|(\+212[67]\d{8})$/;
        if (!phone || !phoneRegex.test(phone)) {
            return res.status(400).json({ status: "error", message: "Invalid phone number format" });
        }

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ status: "error", message: "Products are required" });
        }

        const user = req.user?.id;
        if (!user) {
            return res.status(401).json({ status: "error", message: "Unauthorized user" });
        }

        let priceOrder = 0;
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

            const totalPrice = price * quantity;
            priceOrder += totalPrice;

            formattedProducts.push({
                product: productId,
                quantity,
                totalPrice
            });
        }

        // Create and save the order
        const newOrder = new Order({
            user,
            products: formattedProducts,
            priceOrder,
            phone,
            address,
            status: status || "Pending"
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            status: "success",
            message: "The order was saved successfully",
            order: savedOrder
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
            .select("user products priceOrder status createdAt");

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
