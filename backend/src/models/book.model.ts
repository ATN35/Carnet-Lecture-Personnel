import { query } from '../db';

export const getAllBooks = async (userId: number) => {
  const result = await query('SELECT * FROM books WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

export const addBook = async (title: string, author: string, userId: number) => {
  const result = await query('INSERT INTO books (title, author, user_id) VALUES ($1, $2, $3) RETURNING *', [title, author, userId]);
  return result.rows[0];
};
