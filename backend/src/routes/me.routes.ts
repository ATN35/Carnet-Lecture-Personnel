import { Router } from "express";
import { authenticateToken, AuthenticatedRequest } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authenticateToken, (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Utilisateur non authentifié." });
  }

  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
  });
});

export default router;
