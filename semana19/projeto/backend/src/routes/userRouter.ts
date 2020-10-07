import express from "express";
import { UserController } from "../controller/UserController";


export const userRouter = express.Router();

const userController = new UserController();

userRouter.put("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/profile", userController.getProfile);
userRouter.get("/all", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);