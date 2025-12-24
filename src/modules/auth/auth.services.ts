import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config";

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


const loginUser = async(email:string, password:string)=>{
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if(result.rows.length === 0){
        return null;
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        return false;
    }

    const token = jwt.sign({name: user.name, email: user.email, role: user.role}, config.jwtSecret as string, {
        expiresIn: '10d',
    })

    const {password: _password, ...userWithoutPassword} = user;

    return {token, user: userWithoutPassword};

}

export const authServices = {
  signup,
  loginUser
};
