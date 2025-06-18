import { Router } from "express";
import { authenticateToken, isAdmin } from "../middlewares/auth.middleware";
import * as adminController from "../controllers/admin.controller";

const router = Router();

router.get("/users", authenticateToken, isAdmin, adminController.getAllUsers);

router.delete("/users/:id", authenticateToken, isAdmin, adminController.deleteUser);

router.put("/users/:id/role", authenticateToken, isAdmin, adminController.updateUserRole);

export default router;
