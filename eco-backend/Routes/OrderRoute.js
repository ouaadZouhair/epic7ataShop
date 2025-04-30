import { Router } from "express";
import {addOrder, cancelOrder, getAllOrdersByUser, editOrderStatus, getAllOrders } from "../controllers/orderController.js";
import { verifyToken, authorizeRoles } from '../Middleware/authMiddleware.js';


const orderRouter = Router();

orderRouter.get("/", verifyToken, authorizeRoles('client'), getAllOrdersByUser);

orderRouter.post("/", verifyToken, authorizeRoles('client'), addOrder);

orderRouter.patch("/cancel", verifyToken, authorizeRoles('client'), cancelOrder);

orderRouter.get("/admin/all", verifyToken, authorizeRoles('admin'), getAllOrders);

orderRouter.patch('/admin/status', verifyToken, authorizeRoles('admin'), editOrderStatus)

export default orderRouter;