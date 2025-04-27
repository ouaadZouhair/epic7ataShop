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

// Get monthly revenue

export const getMonthlyRevenue = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const monthlyRevenue = [];
        
        // Get revenue for each month
        for (let month = 0; month < 12; month++) {
            const startDate = new Date(currentYear, month, 1);
            const endDate = new Date(currentYear, month + 1, 0);
            
            const orders = await Order.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                },
                status: { $ne: 'Canceled' } // Exclude canceled orders
            });
            
            const monthlyTotal = orders.reduce((sum, order) => {
                // Sum all fullPrice values from products array
                const orderTotal = order.products.reduce((orderSum, product) => {
                    return orderSum + product.fullPrice;
                }, 0);
                return sum + orderTotal;
            }, 0);
            
            monthlyRevenue.push(monthlyTotal);
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                revenue: monthlyRevenue
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to get monthly revenue',
            error: error.message
        });
    }
};

// Get daily revenue for current week
export const getDailyRevenue = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);

        const result = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek, $lt: endOfWeek },
                    status: { $ne: 'Canceled' }
                }
            },
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" }, // 1=Sunday, 7=Saturday
                    total: { $sum: "$products.fullPrice" }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);

        // Initialize array with 7 days (0 values)
        const dailyRevenue = Array(7).fill(0);
        
        // Map aggregation results to our array
        result.forEach(day => {
            // MongoDB returns 1-7, we need 0-6 (Sunday=0)
            const dayIndex = day._id - 1;
            dailyRevenue[dayIndex] = day.total;
        });

        const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        res.status(200).json({
            status: 'success',
            data: {
                labels: dayLabels,
                revenue: dailyRevenue
            }
        });
    } catch (error) {
        console.error('Error in getDailyRevenue:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to get daily revenue',
            error: error.message
        });
    }
};


