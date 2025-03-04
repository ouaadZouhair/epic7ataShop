import { Router } from "express";
import { getAllUsers, getUserById, deleteUserById } from "../controllers/userController.js";
import { verifyToken, authorizeRoles } from '../Middleware/authMiddleware.js';


const userRouter = Router();

userRouter.get("/",  verifyToken, authorizeRoles('admin'), getAllUsers);

userRouter.get("/:id", verifyToken, authorizeRoles('admin'), getUserById);

userRouter.delete("/:id", verifyToken, authorizeRoles('admin'), deleteUserById);

export default userRouter;