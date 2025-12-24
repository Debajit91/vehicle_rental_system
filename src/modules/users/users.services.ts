import { pool } from "../../config/db";

const getUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );

  return result;
};

const updateUser = async (
  name: string,
  email: string,
  phone?: string,
  role?: string,
  targetedUserId?: string,
  userId?: string,
  userRole?: string
) => {
  if (userRole === "admin") {
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2, phone=$3, role=$4, updated_at = NOW() WHERE id=$5 RETURNING *`,
      [name, email, phone, role, targetedUserId]
    );

    return result;
  }
  const result = await pool.query(
      `UPDATE users SET name=$1, email=$2, phone=$3, updated_at = NOW() WHERE id=$4 AND id=$5 RETURNING *`,
      [name, email, phone, targetedUserId, userId]
    );

    return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);

  return result;
};

export const userServices = {
  getUsers,
  updateUser,
  deleteUser,
};
