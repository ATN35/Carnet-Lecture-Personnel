import { Router } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middlewares/auth.middleware';
import * as commentController from '../controllers/comment.controller';

const router = Router();

router.post('/:bookId', authenticateToken, (req: AuthenticatedRequest, res) => {
  commentController.addComment(req, res);
});

router.put('/:commentId', authenticateToken, (req: AuthenticatedRequest, res) => {
  commentController.updateComment(req, res);
});

router.delete('/:commentId', authenticateToken, (req: AuthenticatedRequest, res) => {
  commentController.deleteComment(req, res);
});

router.get('/book/:bookId', authenticateToken, (req: AuthenticatedRequest, res) => {
  commentController.getCommentsByBookId(req, res);
});

export default router;
