import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { authenticateToken, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { query } from "../db";

const router = Router();

// 🔐 Authentification
router.post("/register", register);
router.post("/login", login);

// ✅ Récupérer les infos de l'utilisateur connecté
router.get("/me", authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const result = await query(
      "SELECT email, role, created_at FROM users WHERE id = $1",
      [req.user!.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    const { email, role, created_at } = result.rows[0];

    return res.status(200).json({
      email,
      role,
      createdAt: created_at,
    });
  } catch (err) {
    console.error("Erreur /me :", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
});

// 🚪 Déconnexion
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({ message: "Déconnecté avec succès." });
});

export default router;
