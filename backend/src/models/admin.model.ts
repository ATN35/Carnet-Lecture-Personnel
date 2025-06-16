import { query } from "../db";

export const getAllUsers = async () => {
  const result = await query(
    "SELECT id, email, role, created_at FROM users ORDER BY id"
  );
  return result.rows;
};

export const deleteUserById = async (id: number) => {
  const result = await query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
  return result.rowCount;
};

export const updateUserRole = async (id: number, role: "user" | "admin") => {
  const result = await query(
    "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, role",
    [role, id]
  );
  return result.rows[0];
};
