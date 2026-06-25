import { myPool } from "../server.js";

export interface UserData {
  username: string;
  password: string;
}
export interface UserRow {
  user_id: string;
  username: string;
  password: string;
  created_at: string;
}
const userModel = {
  async signUp(userData: UserData) {
    const signUpQuery = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;
    const values = [userData.username, userData.password];
    const results = await myPool.query(signUpQuery, values);
    return results.rows[0];
  },
  async getUsername(username: string): Promise<UserRow | null> {
    const usernameQuery = "SELECT * FROM users WHERE username =$1";
    const usernameResult = await myPool.query(usernameQuery, [username]);
    return usernameResult.rows[0];
  },
};

export default userModel;
