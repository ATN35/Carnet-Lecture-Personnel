import { Router } from "express";
import { authenticateToken, isAdmin } from "../middlewares/auth.middleware";
import * as adminController from "../controllers/admin.controller";

const router = Router();

// 👥 Liste des utilisateurs
router.get("/users", authenticateToken, isAdmin, adminController.getAllUsers);

// 🗑️ Supprimer un utilisateur
router.delete("/users/:id", authenticateToken, isAdmin, adminController.deleteUser);

// 🔁 Modifier le rôle d’un utilisateur
router.put("/users/:id/role", authenticateToken, isAdmin, adminController.updateUserRole);

export default router;
