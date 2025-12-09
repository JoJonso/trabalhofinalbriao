const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const reviewRoutes = require('./routes/reviewRoutes');
const gamesRoutes = require('./routes/gamesRoutes');

app.use(cors());
app.use(express.json());
app.use(reviewRoutes);
app.use(gamesRoutes);


app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:"+ PORT);
});
