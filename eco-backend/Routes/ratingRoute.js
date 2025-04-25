import {getProductRating, createRating } from "../controllers/ratingController.js"; 
import { authorizeRoles, verifyToken } from "../Middleware/authMiddleware.js";
import {Router} from 'express';

const ratingRoute = Router()

// creating rating Products / route -> /api/v1/products
ratingRoute.post('/:productId', verifyToken, authorizeRoles("client"), createRating)

// get rating product / route -> /api/v1/products/productId
ratingRoute.get('/:productId', getProductRating)

export default ratingRoute