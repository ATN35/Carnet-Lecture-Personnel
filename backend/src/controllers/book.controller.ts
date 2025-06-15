import { Response } from "express";
import { pool } from "../db";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export async function getBooks(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;

  try {
    const result = await pool.query("SELECT * FROM books WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des livres." });
  }
}

export async function addBook(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const { title, author } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO books (title, author, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, author, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout du livre." });
  }
}

export async function deleteBook(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Livre non trouvé." });
    }
    res.status(200).json({ message: "Livre supprimé." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du livre." });
  }
}

export async function updateBook(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const { id } = req.params;
  const { title, author } = req.body;

  try {
    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, author, id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Livre non trouvé ou non autorisé." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du livre." });
  }
}