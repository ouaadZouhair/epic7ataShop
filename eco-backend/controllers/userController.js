import User from "../Models/User.js";
import Order from "../Models/Order.js";
import Product from "../Models/Product.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "client" }).select("-password -role -updatedAt");
        res.status(200).send({ status: "success", users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ status: "error", message: "User not found" });
        }

        // Fetch all orders for the given user
        const orders = await Order.find({ user: userId })
            .populate("products.product", "title price") // Populate product details
            .select("products priceOrder status createdAt"); // Select order details to return

        // Send response with user data and associated orders
        res.status(200).send({
            status: "success",
            user,
            orders
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).send({ status: "success", message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
}