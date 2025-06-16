import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import commentRoutes from "./routes/comment.routes";
import adminRoutes from "./routes/admin.routes";
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);

app.listen(4000, '0.0.0.0', () => {
  console.log("✅ Serveur backend lancé sur http://localhost:4000");
});
