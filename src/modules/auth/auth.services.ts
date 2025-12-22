import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

interface SignupPayload {
    name: string,
    email: string,
    password: string,
    phone: string,
    role: string
}

const signup = async (payload: SignupPayload) => {
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if(email !== email.toLowerCase()){
    throw new Error("Email must be lower case")
  }

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, (LOWER($2)), $3, $4, $5) RETURNING *`,
    [name, email, hashedPass, phone, role]
  );

  return result;
};

export const authServices = {
  signup,
};
