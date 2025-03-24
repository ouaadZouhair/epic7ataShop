import { Router } from "express";

import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishListController.js";

import { verifyToken, authorizeRoles } from '../Middleware/authMiddleware.js';


const wishlistRouter = Router();

wishlistRouter.get("/", verifyToken, authorizeRoles('client'), getWishlist);

wishlistRouter.post("/", verifyToken, authorizeRoles('client'), addToWishlist);

wishlistRouter.delete("/:productId" , verifyToken, authorizeRoles('client'), removeFromWishlist);

export default wishlistRouter;