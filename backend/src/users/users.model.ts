import { myPool } from "../server.js";

export interface UserData {
  username: String;
  password: String;
}
const userModel = {
  async signUp(userData: UserData) {
    const signUpQuery = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;
    const values = [userData.username, userData.password];
    const results = await myPool.query(signUpQuery, values);
    return results.rows[0];
  },
  async login() {},
};

export default userModel;
