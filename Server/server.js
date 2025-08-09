const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;
const DB_FILE = "db.json";

// Endpoint para guardar mensaje
app.post("/contacto", (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const nuevoMensaje = { nombre, email, mensaje, fecha: new Date() };

  // Leer el archivo actual
  let data = [];
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE);
    data = JSON.parse(raw);
  }

  data.push(nuevoMensaje);

  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.status(201).json({ mensaje: "Mensaje guardado con éxito" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
