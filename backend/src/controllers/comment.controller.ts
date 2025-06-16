import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import * as commentModel from '../models/comment.model';

export async function addComment(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const { bookId } = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "Le contenu est requis." });

  try {
    const comment = await commentModel.createComment(userId!, parseInt(bookId), content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout du commentaire." });
  }
}

export async function updateComment(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const updated = await commentModel.updateComment(parseInt(commentId), userId!, content);
    if (!updated) return res.status(404).json({ error: "Commentaire introuvable ou non autorisé." });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
}

export async function deleteComment(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.id;
  const { commentId } = req.params;

  try {
    const deleted = await commentModel.deleteComment(parseInt(commentId), userId!);
    if (!deleted) return res.status(404).json({ error: "Commentaire introuvable ou non autorisé." });
    res.sendStatus(204);
  } catch {
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
}

export async function getCommentsByBookId(req: AuthenticatedRequest, res: Response) {
  const { bookId } = req.params;
  try {
    const comments = await commentModel.getCommentsByBookId(parseInt(bookId));
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des commentaires." });
  }
}
