import { Router } from "express";
import {addOrder, cancelOrder, getAllOrdersByUser } from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/", addOrder);

orderRouter.get("/", getAllOrdersByUser);

orderRouter.patch("/:id", cancelOrder);

export default orderRouter;