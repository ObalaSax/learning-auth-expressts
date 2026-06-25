import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel, { type UserData, type UserRow } from "./users.model.js";

/**
 * Generate JWT token
 */
const generateToken = (user: UserRow): string => {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) throw new Error("JWT_SECRET not set");

  return jwt.sign(
    {
      userId: user.user_id,
      username: user.username,
    },
    secret,
    { expiresIn: "1d" },
  );
};

/**
 * SIGNUP
 */
export const signupUser = async (data: UserData) => {
  const { username, password } = data;

  // Check if exists
  const existingUser = await userModel.getUsername(username);
  if (existingUser) {
    throw new Error("Username already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = await userModel.signUp({
    username,
    password: hashedPassword,
  });

  const token = generateToken(user);

  return {
    user: {
      user_id: user.user_id,
      username: user.username,
      password: user.password,
      created_at: user.created_at,
    },
    token,
  };
};

/**
 * LOGIN
 */
export const loginUser = async (data: UserData) => {
  const { username, password } = data;

  const user = await userModel.getUsername(username);

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  const token = generateToken(user);

  return {
    user: {
      user_id: user.user_id,
      username: user.username,
      created_at: user.created_at,
    },
    token,
  };
};

/**
 * LOGOUT
 */
export const logoutUser = async () => {
  return {
    message: "Logout successful. Remove token on client.",
  };
};
