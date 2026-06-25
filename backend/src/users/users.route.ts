import bcrypt from "bcrypt";
import { Router } from "express";
import userController from "./users.controller.js";

const userRouter = Router();

userRouter.post("/signup", userController.userSignUp);
//userRouter.post("/login", userController.userLogin);

export default userRouter;
