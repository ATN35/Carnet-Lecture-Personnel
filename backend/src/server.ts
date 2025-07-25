import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import commentRoutes from "./routes/comment.routes";
import adminRoutes from "./routes/admin.routes";
import meRoutes from "./routes/me.routes";

dotenv.config();

const app = express();

const allowedOrigins = [ 
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://49.12.238.138:3000",
  "http://49.12.238.138:4000",
  "http://carnetdelecture.duckdns.org",
  "http://carnetdelecture.duckdns.org:3000",
  "http://carnetdelecture.duckdns.org:4000",
  "https://carnetdelecture.duckdns.org",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS non autorisé : " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", meRoutes);

app.listen(4000, "0.0.0.0", () => {
  console.log("✅ Serveur backend lancé sur http://0.0.0.0:4000");
});
