import { Router } from "express";
import {addOrder, cancelOrder, getAllOrdersByUser } from "../controllers/orderController.js";
import { verifyToken, authorizeRoles } from '../Middleware/authMiddleware.js';


const orderRouter = Router();

orderRouter.post("/", verifyToken, authorizeRoles('client'), addOrder);

orderRouter.get("/", verifyToken, authorizeRoles('client'), getAllOrdersByUser);

orderRouter.patch("/:id", verifyToken, authorizeRoles('client'), cancelOrder);

export default orderRouter;