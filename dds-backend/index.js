import express from 'express';
import categoriasMock from './routes/categoriasmock.js';
import inicializarBase from './models/inicializarBase.js';
import categorias from "./routes/categorias.js";
import articulos from "./routes/articulos.js";
import cors from 'cors';
import seguridadRouter from './routes/seguridad.js';
import usuariosRouter from './routes/usuarios.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import isAliveRouter from './routes/isalive.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // para poder leer json en el body

app.use(categoriasMock);

app.get('/', (req, res) => {
    res.send('Backend inicial dds-backend!');
});

app.use(categorias);

app.use(articulos);

app.use(seguridadRouter);

app.use(usuariosRouter);

app.use(isAliveRouter);

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use((req, res) => {
  res.status(404).send("No encontrada!");
});

if (import.meta.url === `file://${__filename}`) {
    await inicializarBase();
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
}

export default app;