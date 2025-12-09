import express from "express";
import cors from "cors";
import gamesRoutes from "./routes/gamesRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
const PORT = 3000;

// CORS
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

app.use(express.json());

// Rotas
app.use("/games", gamesRoutes);
app.use("/reviews", reviewRoutes);

// Rota raiz
app.get("/", (req,res) => res.send("Backend rodando!"));

// Servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
