import { authorizeRoles, verifyToken } from "../Middleware/authMiddleware.js";
import { getFromCart, addtoCart, removeFromCart, updateCart, resetCart } from "../controllers/cartController.js";
import { Router } from "express";

const cartRouter = Router();

cartRouter.get("/", verifyToken, authorizeRoles('client'), getFromCart);
cartRouter.post("/", verifyToken, authorizeRoles('client'), addtoCart);
cartRouter.delete("/product/:productId", verifyToken, authorizeRoles('client'), removeFromCart);
cartRouter.patch("/product/:productId", verifyToken, authorizeRoles('client'), updateCart);
cartRouter.delete("/reset", verifyToken, authorizeRoles('client'), resetCart);

export default cartRouter;