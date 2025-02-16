import { Router } from "express";
import { getAllUsers, getUserById, deleteUserById } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.delete("/:id", deleteUserById);

export default userRouter;