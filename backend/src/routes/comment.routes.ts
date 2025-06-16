import { Router } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middlewares/auth.middleware';
import * as commentController from '../controllers/comment.controller';

const router = Router();

// ➕ Ajouter un commentaire à un livre
router.post('/:bookId', authenticateToken, (req: AuthenticatedRequest, res) => {
  commentController.addComment(req, res);
});

// ✏️ Modifier un commentaire
router.put('/:commentId', authenticateToken, (req: AuthenticatedRequest, res) => {
  commentController.updateComment(req, res);
});

// 🗑️ Supprimer un commentaire
router.delete('/:commentId', authenticateToken, (req: AuthenticatedRequest, res) => {
  commentController.deleteComment(req, res);
});

// 📖 Obtenir tous les commentaires liés à un livre
router.get('/book/:bookId', authenticateToken, (req: AuthenticatedRequest, res) => {
  commentController.getCommentsByBookId(req, res);
});

export default router;
