import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import * as adminModel from "../models/admin.model";

export async function getAllUsers(req: AuthenticatedRequest, res: Response) {
  try {
    const users = await adminModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Erreur getAllUsers:", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des utilisateurs." });
  }
}

export async function deleteUser(req: AuthenticatedRequest, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const deleted = await adminModel.deleteUserById(id);
    if (!deleted) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }
    res.status(204).end();
  } catch (error) {
    console.error("Erreur deleteUser:", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
}

export async function updateUserRole(req: AuthenticatedRequest, res: Response) {
  const id = parseInt(req.params.id);
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "Rôle invalide. Valeurs acceptées : user ou admin." });
  }

  try {
    const updated = await adminModel.updateUserRole(id, role);
    if (!updated) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }
    res.json(updated);
  } catch (error) {
    console.error("Erreur updateUserRole:", error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour du rôle." });
  }
}
