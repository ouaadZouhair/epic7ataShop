import Rating from "../Models/Rating.js";
import Product from "../Models/Product.js"
import mongoose from "mongoose";

// Helper function to update product rating and count
async function updateProductRating(productId, session = null) {
    try {
        const result = await Rating.aggregate([
            { 
                $match: { 
                    product: new mongoose.Types.ObjectId(productId) 
                } 
            },
            { 
                $group: { 
                    _id: '$product', 
                    averageRating: { $avg: '$rating' },
                    count: { $sum: 1 }
                }
            }
        ]);

        if (result.length > 0) {
            const updateData = {
                ratingAvg: parseFloat(result[0].averageRating.toFixed(1)),
                ratingCount: result[0].count
            };

            const options = session ? { session } : {};
            await Product.findByIdAndUpdate(
                productId, 
                updateData, 
                options
            );
        }
    } catch (error) {
        console.error("Error updating product rating:", error);
        throw error; // Re-throw to be caught in the calling function
    }
}

export const createRating = async (req, res) => {
    try {
        const { rating, review} = req.body;
        const { productId } = req.params;
        const userId = req.user.id;

        // Validate input
        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ 
                status: 'error', 
                msg: "Invalid product ID format" 
            });
        }

        if (rating < 1 || rating > 5) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ 
                status: 'error', 
                msg: "Rating must be between 1 and 5" 
            });
        }
    
        const existingRating = await Rating.findOne({ product: productId, user: userId });
        if (existingRating) {
            return res.status(400).json({ message: "You have already rated this product." });
        }
    
        // Create new rating
        const newRating = new Rating({
            product: productId,
            user: userId,
            rating,
            review,
        });
        await newRating.save();

        // Update product's average rating and count
        await updateProductRating(productId);

        res.status(201).json({ message: "Rating created successfully", rating: newRating });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Internal server error" });
    }
}

export const getProductRating = async (req, res) => {
    try{
        const { productId } = req.params;
        console.log(productId)

        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ 
                status: 'error', 
                msg: "Invalid product ID format" 
            });
        }



        const ratings = await Rating.find({ product: productId }).populate("user", "fullName").sort({ createdAt: -1 });
        res.status(201).json({status:'success', message: "Rating fetched successfully", ratings });

    } catch(err){
        console.error(err);
        return res.status(500).json({status:'error', message: "Internal server error", error:err.message });
    }
}
