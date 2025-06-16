import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: { id: number; role?: "user" | "admin" };
}

// 🔐 Vérification du token
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: "user" | "admin";
    };

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    return res.status(403).json({ message: "Token invalide." });
  }
}

// 🛡️ Middleware pour route admin uniquement
export function isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé à l'administrateur." });
  }
  next();
}
