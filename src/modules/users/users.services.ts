import { pool } from "../../config/db"

const getUsers = async()=>{
    const result = await pool.query(`SELECT id, name, email, phone, role FROM users`);

    return result;
}

const updateUser = async(name: string, email: string, phone: string, role: string, id: string)=>{
    
    const result = await pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4, updated_at = NOW() WHERE id=$5 RETURNING *`, [name, email, phone, role, id]);

    return result;
}

export const userServices = {
    getUsers,
    updateUser
}