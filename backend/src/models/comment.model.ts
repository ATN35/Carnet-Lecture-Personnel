import { query } from '../db';

export const createComment = async (userId: number, bookId: number, content: string) => {
  const result = await query(
    'INSERT INTO comments (user_id, book_id, content) VALUES ($1, $2, $3) RETURNING *',
    [userId, bookId, content]
  );
  return result.rows[0];
};

export const updateComment = async (commentId: number, userId: number, content: string) => {
  const result = await query(
    'UPDATE comments SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
    [content, commentId, userId]
  );
  if (result.rowCount === 0) return null;
  return result.rows[0];
};

export const deleteComment = async (commentId: number, userId: number) => {
  const result = await query(
    'DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *',
    [commentId, userId]
  );
  if (result.rowCount === 0) return null;
  return result.rows[0];
};

export const getCommentsByBookId = async (bookId: number) => {
  const result = await query(
    'SELECT * FROM comments WHERE book_id = $1 ORDER BY created_at ASC',
    [bookId]
  );
  return result.rows;
};
