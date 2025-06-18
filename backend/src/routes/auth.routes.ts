import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { authenticateToken, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { query } from "../db";

const router = Router();

router.post("/register", register);
router.post("/login", login);

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

router.put("/change-password", authenticateToken, async (req: AuthenticatedRequest, res) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Mot de passe trop court." });
  }

  try {
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    await query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPassword,
      req.user!.id,
    ]);

    res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (err) {
    console.error("Erreur change-password :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({ message: "Déconnecté avec succès." });
});

export default router;
