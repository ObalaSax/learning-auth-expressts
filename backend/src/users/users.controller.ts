import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import userModel from "./users.model.js";
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
  //async userLogin(req: Request, res: Response) {},
};
export default userController;
