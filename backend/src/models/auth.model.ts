import { query } from '../db';

export const createUser = async (email: string, passwordHash: string, role = 'user') => {
  const result = await query(
    'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
    [email, passwordHash, role]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
