import Order from "../Models/Order.js";
import User from "../Models/User.js";
import Product from '../Models/Product.js';


// Get count all orders
export const countOrders = async (req, res) => {
    try {
        const count = await Order.countDocuments({});
        res.status(200).json({ status: 'success', msg: "Get Orders Count successfully", data: count });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
}

// Get count all users
export const countUersClient = async (req, res) => {
    try {
        const count = await User.countDocuments({ role: "client" });
        res.status(200).json({ status: 'success', msg: "Get Users Count successfully", data: count });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
}

// Get count all products
export const countProducts = async (req, res) => {
    try {
        const count = await Product.countDocuments({});
        res.status(200).json({ status: 'success', msg: "Get Products Count successfully", data: count });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
}

// calculte total revenue 
export const calTotalRev = async (req, res) => {
    try {
        const orders = await Order.find({}).populate({
            path: 'products.product',
            select: 'fullPrice',
            // model: 'Product' // explicitly specify the model
        });

        const totalRevenue = orders.reduce((acc, order) => {
            return acc + order.products.reduce((sum, item) => {
                // Use fullPrice from the order if product population failed
                const price =item.fullPrice;
                return sum + price ;
            }, 0);
        }, 0);

        res.status(200).json({ 
            status: 'success', 
            message: "Total revenue calculated successfully", 
            data: totalRevenue 
        });
    } catch (error) {
        console.error('Error calculating revenue:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to calculate revenue', 
            error: error.message 
        });
    }
}


