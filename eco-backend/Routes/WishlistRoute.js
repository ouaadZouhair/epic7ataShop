import { Router } from "express";

import { getWishlist, addProductToWishlist, removeProductFromWishlist } from "../controllers/wishListController.js";

import { verifyToken, authorizeRoles } from '../Middleware/authMiddleware.js';


const wishlistRouter = Router();

wishlistRouter.get("/", verifyToken, authorizeRoles('client'), getWishlist);

wishlistRouter.post("/", verifyToken, authorizeRoles('client'), addProductToWishlist);

wishlistRouter.delete("/:productId" , verifyToken, authorizeRoles('client'), removeProductFromWishlist);

export default wishlistRouter;