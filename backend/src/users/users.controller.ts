import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import userModel from "./users.model.js";
import { loginUser, logoutUser } from "./users.services.js";
const userController = {
  async userSignUp(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.signUp({
        username,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      console.log("Req Body", req.body);
    }
  },
  async userLogin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          message: "Username and Password required",
        });
      }
      const loginResult = await loginUser({ username, password });

      console.log("okay");
      return res.status(201).json({
        success: true,
        data: loginResult,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Signup failed",
      });
    }
  },
  async logout(_req: Request, res: Response) {
    const result = await logoutUser();

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  },
};
export default userController;
