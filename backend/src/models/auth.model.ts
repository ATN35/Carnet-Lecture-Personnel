import { query } from '../db';

export const createUser = async (email: string, passwordHash: string) => {
  const result = await query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email', [email, passwordHash]);
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};