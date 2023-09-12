import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Servir los archivos estáticos desde la carpeta 'build'
app.use(express.static(path.join(__dirname, 'dist')));

// Manejar rutas adicionales (puedes personalizar esto según tu aplicación)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
const port =  3000;
app.listen(port, () => {
  console.log(`Servidor React corriendo en el puerto ${port}`);
});
