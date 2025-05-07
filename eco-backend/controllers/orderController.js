import Order from "../Models/Order.js";
import Cart from "../Models/Cart.js";
import mongoose from "mongoose";
import { createNotification, notifyAdmin } from "../Helpers/notifiationHelper.js";


// Add Order
export const addOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, phone, address, city, paymentMethod, deleviryCost } = req.body;

        // Validate required fields
        if (!phone || !address || !city || !paymentMethod || !deleviryCost) {
            return res.status(400).json({
                status: "error",
                message: "Phone, address, city, payment and deleviry cost method are required"
            });
        }

        // Validate phone format
        const phoneRegex = /^(0[67]\d{8})|(\+212[67]\d{8})$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid phone number format"
            });
        }

        // Get user's cart
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Cart is empty"
            });
        }

        // Prepare order data
        const orderProducts = cart.products.map(item => ({
            product: item.product._id,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
            fullPrice: item.fullPrice
        }));

        // Calcultate TotalPrice
        const totalPrice = cart.totalPrice + deleviryCost;

        // Create new order
        const newOrder = new Order({
            user: userId,
            products: orderProducts,
            totalPrice,
            deleviryCost, // You might want to calculate this
            paymentMethod,
            firstName,
            lastName,
            phone,
            address,
            city,
            status: 'Pending'
        });

        // Save the order
        const savedOrder = await newOrder.save();

        await notifyAdmin(
            req.app.get('io'),
            `New order #${savedOrder._id} placed by ${firstName} ${lastName}`,
            'info',
            `/admin/orders/${savedOrder._id}`
        );

        // Clear the cart after successful order creation
        await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { products: [], totalPrice: 0 } }
        );


        res.status(201).json({
            status: "success",
            message: "Order created successfully from cart",
            order: savedOrder
        });

    } catch (error) {
        console.error("Error creating order from cart:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Get All Orders by User
export const getAllOrdersByUser = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid user ID format"
            });
        }

        const orders = await Order.find({ user: userId })
            .populate({
                path: "products.product",
                select: "title price imageUrls",
                options: { retainNullValues: true }
            })
            .populate({
                path: "user",
                select: "fullName email"
            })
            .sort({ createdAt: -1 })
            .lean();

        const transformedOrders = orders.map(order => {
            // Safely handle user data
            const user = order.user ? {
                fullName: order.user.fullName,
                email: order.user.email
            } : null;

            // Safely transform products
            const products = order.products.map(item => {
                const product = item.product ? {
                    _id: item.product._id,
                    title: item.product.title,
                    price: item.product.price,
                    imageUrls: item.product.imageUrls || { frontMockups: '', backMockups: '' }
                } : null;

                return {
                    ...item,
                    product: product,
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                    fullPrice: item.fullPrice
                };
            });

            // Return the transformed order object
            return {
                ...order,
                user: user,
                products: products
            };
        });

        res.status(200).json({
            status: "success",
            message: "Orders retrieved successfully",
            count: transformedOrders.length,
            data: transformedOrders
        });

    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve orders",
            error: error.message
        });
    }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};
        if (status) filter.status = status;

        const orders = await Order.find(filter)
            .populate({
                path: "products.product",
                select: "title price imageUrls",
                options: { retainNullValues: true }
            })
            .populate({
                path: "user",
                select: "fullName email"
            })
            .sort({ createdAt: -1 })
            .lean();

        const transformedOrders = orders.map(order => {
            const user = order.user ? {
                fullName: order.user.fullName,
                email: order.user.email
            } : null;

            const products = order.products.map(item => {
                const product = item.product ? {
                    _id: item.product._id,
                    title: item.product.title,
                    price: item.product.price,
                    imageUrls: item.product.imageUrls || { frontMockups: '', backMockups: '' }
                } : null;

                return {
                    ...item,
                    product: product,
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                    fullPrice: item.fullPrice
                };
            });

            return {
                ...order,
                user: user,
                products: products
            };
        });

        res.status(200).json({
            status: "success",
            message: "All orders retrieved successfully",
            count: transformedOrders.length,
            data: transformedOrders
        });

    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve orders",
            error: error.message
        });
    }
};

export const editOrderStatus = async (req, res) => {
    try {
        // const orderId = req.params.id;
        const { status: newStatus, orderId } = req.body

        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return res.status(404).json({ status: "failed", message: "Order not found" });
        }

        if (order.status === "Canceled") {
            return res.status(400).json({ status: "failed", message: "Order Already canceled" });
        }

        if (order.status === "Completed") {
            return res.status(400).json({ status: "failed", message: "Order Already completed" });
        }

        order.status = newStatus;
        await order.save()

        await createNotification(
            req.app.get('io'),
            order.user,
            `Your order #${order._id} is on ${newStatus}`,
            newStatus === 'Completed' ? 'success' : 'info',
            `/orders/${order._id}`
        );

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


}

// Cancel Order
export const cancelOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.body;

        const order = await Order.findOne({ _id: orderId, user: userId })
        .populate({
            path: "user",
            select: "fullName email"
        });

        if (!order) {
            return res.status(404).json({ status: "failed", message: "Order not found" });
        }

        if (order.status !== "Pending") { // Ensure case matches schema definition
            return res.status(400).json({ status: "failed", message: `Order cannot be canceled  because is (${order.status})` });
        }

        order.status = "Canceled"; // Ensure consistency with schema enum values
        await order.save();

        console.log(order)

        await notifyAdmin(
            req.app.get('io'),
            `Order #${order._id} has been canceled by ${order.user.fullName}`,
            'warning',
            `/dashboard/orders/${order._id}`
        );

        return res.status(200).json({
            status: "success",
            message: "Order status canceled successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: error.message
        });
    }
};
