import Product from "../Models/Product.js";
import Order from "../Models/Order.js";
import Cart from "../Models/Cart.js";
import mongoose from "mongoose";


// Add Order
// export const addOrder = async (req, res) => {
//     try {
//         const { products, phone, address, city, status } = req.body;
//         const  userId  = req.user.id

//         const phoneRegex = /^(0[67]\d{8})|(\+212[67]\d{8})$/;
//         if (!phone || !phoneRegex.test(phone)) {
//             return res.status(400).json({ status: "error", message: "Invalid phone number format" });
//         }

//         if (!products || !Array.isArray(products) || products.length === 0) {
//             return res.status(400).json({ status: "error", message: "Products are required" });
//         }


//         if (!userId) {
//             return res.status(401).json({ status: "error", message: "Unauthorized user" });
//         }

//         let totalPrice = 0;
//         let formattedProducts = [];

//         // Fetch product prices
//         const productIds = products.map(item => item.product);
//         const productData = await Product.find({ _id: { $in: productIds } });

//         // Create a price map
//         const productMap = new Map();
//         productData.forEach(product => productMap.set(product._id.toString(), product.price));

//         for (const item of products) {
//             const { product: productId, quantity } = item;

//             if (!quantity || quantity <= 0) {
//                 return res.status(400).json({ status: "error", message: `Invalid quantity for product: ${productId}` });
//             }

//             const price = productMap.get(productId);
//             if (!price) {
//                 return res.status(404).json({ status: "error", message: `Product not found: ${productId}` });
//             }

//             const fullPrice = price * quantity;
//             totalPrice += fullPrice;

//             formattedProducts.push({
//                 product: productId,
//                 quantity,
//                 fullPrice
//             });
//         }

//         // Create and save the order
//         const newOrder = new Order({
//             user,
//             products: formattedProducts,
//             totalPrice,
//             phone,
//             address,
//             city,
//             status: status || "Pending"
//         });

//         const savedOrder = await newOrder.save();

//         res.status(201).json({
//             status: "success",
//             message: "The order was saved successfully",
//             savedOrder
//         });

//     } catch (error) {
//         console.error("Error saving order:", error);
//         return res.status(500).json({ status: "error", message: "Internal Server Error" });
//     }
// };

// Move cart to order
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
// Get All Orders by User - Fixed Version
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
            return res.status(400).json({ status: "failed", message: "Order cannot be canceled  because " });
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

// export const removeProductFromOrder = async (req, res) => {
//     try {
//         const userID = req.user.id;
//         const orderId = req.params.id;

//         const order = await Order.findOneAndDelete({ _id: orderId, user: userID });

//         if (!order) {
//             return res.status(404).json({ status: "failed", message: "Order not found" });
//         }

//         return res.status(200).json({
//             status: "success",
//             message: "Order removed successfully"
//         });

//     } catch (error) {
//         return res.status(500).json({
//             status: "failed",
//             message: "Something went wrong",
//             error: error.message
//         });
//     }
// }
