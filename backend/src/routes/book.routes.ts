import { Router } from "express";
import { pool } from "../db";
import { authenticateToken, AuthenticatedRequest } from "../middlewares/auth.middleware";

const router = Router();

// 📚 Récupérer tous les livres de l'utilisateur connecté
router.get("/", authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const result = await pool.query("SELECT * FROM books WHERE user_id = $1", [req.user!.id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des livres." });
  }
});

// ➕ Ajouter un nouveau livre
router.post("/", authenticateToken, async (req: AuthenticatedRequest, res) => {
  const { title, author } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Le titre est obligatoire." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO books (title, author, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, author || null, req.user!.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout du livre." });
  }
});

// ✏️ Modifier un livre
router.put("/:id", authenticateToken, async (req: AuthenticatedRequest, res) => {
  const { title, author } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, author, id, req.user!.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Livre introuvable ou non autorisé." });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du livre." });
  }
});

// 🗑️ Supprimer un livre
router.delete("/:id", authenticateToken, async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user!.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Livre introuvable ou non autorisé." });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du livre." });
  }
});

export default router;
