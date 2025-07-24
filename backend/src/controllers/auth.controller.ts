import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db";

export async function register(req: Request, res: Response) {
  const { email, password, role = 'user' } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
      [email, hashedPassword, role]
    );
    res.status(201).json({ message: "Inscription réussie." });
  } catch (error) {
    console.error("❌ Erreur dans register:", error);
    res.status(500).json({ error: "Erreur lors de l'inscription." });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      console.warn("⚠️ Utilisateur non trouvé pour l'email :", email);
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn("⚠️ Mot de passe invalide pour l'utilisateur :", email);
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET non défini dans l'environnement");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    res.json({ message: "Connexion réussie." });
  } catch (error) {
    console.error("❌ Erreur dans login:", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
}
